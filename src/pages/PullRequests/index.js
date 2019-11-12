import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FaGithub, FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';

import api from '~/services/api';

import {
  Container,
  Loader,
  Info,
  Label,
  PullRequestList,
  OpenButton,
  Empty,
  Error,
} from './styles';

export default function Repository({ history, match }) {
  const [repositoryInfo, setRepositoryInfo] = useState('');
  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const refs = [];

  useEffect(() => {
    (async function getData() {
      const {
        params: { owner, repository: name },
      } = match;

      if (!owner || !name) {
        history.push('/');
      }

      const repositories =
        JSON.parse(localStorage.getItem('favrepositories')) || [];

      const repo = repositories.reduce((acm, repository) => {
        if (repository.name === name && repository.owner === owner) {
          return repository;
        }
        return acm;
      }, {});

      if (repo.name) {
        setRepositoryInfo(repo);
      } else {
        try {
          setRepositoryInfo(
            await api.get(`/repos/${owner}/${name}`).then(({ data }) => {
              const {
                owner: { avatar_url: avatarURL },
                description,
              } = data;
              const newRepo = {
                owner: match.params.owner,
                avatar: avatarURL,
                name: match.params.repository,
                description,
              };

              repositories.push(newRepo);
              localStorage.setItem(
                'favrepositories',
                JSON.stringify(repositories)
              );
              return newRepo;
            })
          );
        } catch (err) {
          if (err.response.data.message.includes('exceeded')) {
            const resetDate = new Date(
              Number(err.response.headers['x-ratelimit-reset'] * 1000)
            );
            setError(
              `Quota excedida. Próximo reset: ${moment(resetDate).format(
                'HH:mm:ss'
              )}`
            );
          }
          console.error(error);
        }
      }

      try {
        setPullRequests(
          await api.get(`/repos/${owner}/${name}/pulls`).then(({ data }) => {
            if (!data.length) {
              setLoading(false);
              return [];
            }
            return data.map(value => {
              const {
                html_url: pullURL,
                title,
                number,
                user: { login: userName, avatar_url: userAvatar },
                body,
                labels,
                created_at: createdAt,
                updated_at: updatedAt,
              } = value;
              setLoading(false);
              return {
                pullURL,
                title,
                number,
                userName,
                userAvatar,
                body,
                labels,
                createdAt,
                updatedAt,
              };
            });
          })
        );
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  function handleDrawer(e) {
    const { id } = e.currentTarget;
    refs[id].classList.toggle('closed');
    e.currentTarget.classList.toggle('closed');
  }

  return (
    <Container>
      <h1>
        <FaGithub size={32} />
        <strong>GitHub </strong> Pull Requests
      </h1>
      {loading && (
        <Loader>
          <AiOutlineLoading size={32} />
        </Loader>
      )}
      {!loading && error && (
        <Error>
          <img src="/images/octocat.jpg" alt="No Open Pull Requests" />
          <p>{error}</p>
        </Error>
      )}
      {!loading && !error && (
        <>
          <Info>
            <img src={repositoryInfo.avatar} alt={repositoryInfo.owner} />
            <h1>
              <strong>{repositoryInfo.owner}</strong>
            </h1>
            <span>{repositoryInfo.name}</span>
            <p>{repositoryInfo.description}</p>
          </Info>
          <PullRequestList>
            <div className="title">
              <h1>Pull Requests</h1>
              <Link to="/">
                <FaArrowLeft /> Go Back
              </Link>
            </div>
            <ul>
              {!pullRequests.length && (
                <Empty>
                  <img src="/images/octocat.jpg" alt="No Open Pull Requests" />
                  <p>No Open Pull Requests!</p>
                </Empty>
              )}
              {pullRequests.map(
                ({
                  body,
                  labels,
                  number,
                  pullURL,
                  title,
                  userAvatar,
                  userName,
                }) => {
                  return (
                    <li
                      key={`${title}-${number}`}
                      ref={ref => {
                        refs[`${title}-${number}`] = ref;
                      }}
                      className="closed"
                    >
                      <div className="infoRow">
                        <img src={userAvatar} alt={userName} />
                        <div className="container">
                          <div className="info">
                            <div className="title">
                              <a
                                href={pullURL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <strong>{title}</strong>
                              </a>
                              {labels.map(({ name, color }) => (
                                <Label key={name} color={color}>
                                  {name}
                                </Label>
                              ))}
                            </div>
                            <p>{userName}</p>
                          </div>
                          <OpenButton
                            id={`${title}-${number}`}
                            className="closed"
                            onClick={handleDrawer}
                          >
                            <FaChevronDown />
                          </OpenButton>
                        </div>
                      </div>
                      <div className="body">
                        <p>{body}</p>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </PullRequestList>
        </>
      )}
    </Container>
  );
}

Repository.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};
