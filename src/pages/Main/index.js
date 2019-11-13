/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  Error,
} from './styles';

export default function Main({ history }) {
  const [loading, setLoading] = useState(false);
  const [repository, setRepository] = useState('');
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || {}
  );
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
      if (err.response.data.message.toLowerCase().includes('found')) {
        setError('Repositório não encontrado.');
      }
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

  async function loadUsers(value) {
    if (value.length === 4 && !users[value.toLowerCase()]) {
      try {
        const response = await api.get(`/search/users?q=${value}+repos:>0`);
        const {
          data: { items },
        } = response;
        const usersWithRepos = items.map(({ login }) => login);
        setUsers(prev => ({ ...prev, [value]: usersWithRepos }));
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
        if (err.response.data.message.toLowerCase().includes('found')) {
          setError('Usuário não encontrado.');
        }
        console.error(error);
      }
    }
  }

  async function loadRepos(user) {
    if (!repositories[user.toLowerCase()]) {
      try {
        const { data } = await api.get(`/users/${user}/repos`);
        const repos = data.map(({ name }) => `${user}/${name}`);
        setRepositories(prev => ({ ...prev, [user.toLowerCase()]: repos }));
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
        if (err.response.data.message.toLowerCase().includes('found')) {
          setError('Repositório não encontrado.');
        }
        console.error(error);
      }
    }
  }

  function handleChange(event, { newValue }) {
    setRepository(newValue);
    const [user, repo] = newValue.split('/');
    (async function updateOptions() {
      await loadUsers(user);
      if (repo) {
        loadRepos(user);
      }
    })();
  }

  function createOptionsArray(user) {
    const data = repositories[user.toLowerCase()] || users;

    if (repositories[user.toLowerCase()]) {
      return data.map(repoName => repoName);
    }
    const result = [];
    Object.keys(data).forEach(key => {
      result.push(...data[key]);
    });
    result.sort((a, b) => (a > b ? 1 : -1));
    return result;
  }

  function filterOptions(value) {
    const inputValue = value.trim().toLowerCase();

    if (!inputValue.length) return [];

    const [user, repo] = inputValue.split('/');
    const filteredOptions = createOptionsArray(user);

    if (!filteredOptions) return [];

    if (!repo) {
      return filteredOptions.filter(
        usr => usr.toLowerCase().slice(0, user.length) === user
      );
    }
    return filteredOptions.filter(
      rp => rp.toLowerCase().substr(user.length + 1, repo.length) === repo
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
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [favRepositories, users, repositories]);

  return (
    <Container>
      <h1>
        <FaGithub size={32} />
        <strong>GitHub </strong> Pull Requests
      </h1>
      <Error>{error}</Error>
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
