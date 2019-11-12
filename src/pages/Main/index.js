/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { FaGithub, FaTrashAlt, FaArrowRight } from 'react-icons/fa';
import { GoRepoPull } from 'react-icons/go';
import { AiOutlineLoading } from 'react-icons/ai';
import api from '~/services/api';

import {
  Container,
  Form,
  SubmitButton,
  Input,
  RepoList,
  GoButton,
  RemoveButton,
} from './styles';

export default function Main({ history }) {
  const [loading, setLoading] = useState(false);
  const [repository, setRepository] = useState('');
  const [repositories, setRepositories] = useState(
    JSON.parse(localStorage.getItem('repositories')) || {}
  );
  const [favRepositories, setFavRepositories] = useState(
    JSON.parse(localStorage.getItem('favrepositories')) || []
  );
  const [options, setOptions] = useState([]);
  const [error, setError] = useState('');

  const input = useRef(null);

  function goTo(repoName, repoOwner) {
    history.push(`/pullrequests/${repoOwner}/${repoName}`);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Checks if repository has owner
    const regex = /^([\w.@:/\-~]+)[/]([\w.@:/\-~]+)$/;
    if (!regex.test(repository)) {
      input.current.input.focus();
      return setError(
        'Type both owner and repository name (eg: reacttraining/history)'
      );
    }
    try {
      setLoading(true);
      const { data } = await api.get(`/repos/${repository}`);
      const {
        owner: { avatar_url: avatar, login: owner },
        name,
        description,
      } = data;
      if (
        favRepositories.length &&
        favRepositories.findIndex(({ name: repoName, owner: repoOwner }) => {
          return name === repoName && owner === repoOwner;
        }) >= 0
      ) {
        return setLoading(false);
      }
      setFavRepositories(prev => [
        ...prev,
        { name, description, owner, avatar },
      ]);
      return goTo(name, owner);
    } catch (err) {
      console.error(err);
      return setLoading(false);
    }
  }

  function handleRemove(repoName, repoOwner) {
    const repos = favRepositories.filter(
      ({ name, owner }) => name !== repoName || owner !== repoOwner
    );
    setFavRepositories(repos);
  }

  async function loadRepos(value) {
    if (value.length === 4 && !repositories[value]) {
      try {
        const response = await api.get('/search/repositories', {
          params: {
            q: value,
          },
        });
        const {
          data: { items },
        } = response;
        const repos = items.map(({ full_name }) => full_name);
        setRepositories(prev => ({ ...prev, [value]: repos }));
      } catch (err) {
        console.err(error);
      }
    }
  }

  function handleChange(event, { newValue }) {
    setRepository(newValue);
    (async function updateRepos(v) {
      await loadRepos(v.toLowerCase());
    })(newValue);
  }

  function createRepositoriesArray() {
    const repos = [];
    Object.keys(repositories).forEach(key => {
      repos.push(...repositories[key]);
    });
    repos.sort((a, b) => (a > b ? 1 : -1));
    return repos;
  }

  function filterOptions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const repos = createRepositoriesArray();

    if (!repos.length) return [];
    if (!inputLength) return [];

    return repos.filter(
      repo => repo.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  function getOptions({ value }) {
    setOptions(filterOptions(value));
  }

  function clearOptions() {
    setOptions([]);
  }

  function getOption(value) {
    return value;
  }

  function renderOption(value) {
    return <div>{value}</div>;
  }

  useEffect(() => {
    localStorage.setItem('favrepositories', JSON.stringify(favRepositories));
    localStorage.setItem('repositories', JSON.stringify(repositories));
    createRepositoriesArray();
  }, [favRepositories, repositories]);

  return (
    <Container>
      <h1>
        <FaGithub size={32} />
        <strong>GitHub </strong> Pull Requests
      </h1>
      <Form onSubmit={handleSubmit}>
        <Input>
          <Autosuggest
            suggestions={options}
            onSuggestionsFetchRequested={getOptions}
            onSuggestionsClearRequested={clearOptions}
            getSuggestionValue={getOption}
            renderSuggestion={renderOption}
            inputProps={{
              placeholder:
                'Type owner and repository names (eg: reacttraining/history)',
              value: repository,
              onChange: handleChange,
              className: error
                ? 'react-autosuggest__input error'
                : 'react-autosuggest__input',
            }}
            ref={input}
          />
        </Input>
        <SubmitButton disabled={loading}>
          {loading ? <AiOutlineLoading size={22} /> : <GoRepoPull size={22} />}
        </SubmitButton>
      </Form>
      <span>{error}</span>
      <RepoList>
        <h1>Favorite Repositories</h1>
        <ul>
          {favRepositories.map(({ name, description, owner, avatar }) => {
            return (
              <li key={`${name}/${owner}`}>
                <img src={avatar} alt={owner} />
                <div className="container">
                  <div className="info">
                    <strong>
                      {owner}/{name}
                    </strong>
                    <p>{description}</p>
                  </div>
                  <RemoveButton onClick={() => handleRemove(name, owner)}>
                    <FaTrashAlt />
                  </RemoveButton>
                  <GoButton onClick={() => goTo(name, owner)}>
                    <FaArrowRight />
                  </GoButton>
                </div>
              </li>
            );
          })}
        </ul>
      </RepoList>
    </Container>
  );
}

Main.propTypes = {
  history: PropTypes.shape().isRequired,
};
