<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="120" alt="GitHub">

# GitHub Pull Requests Explorer

![React](https://img.shields.io/badge/ReactJS-16.11.0-%2300b3e6)
![Styled-Components](<https://img.shields.io/badge/styled--components-4.4.1-rgb(219%2C%20112%2C%20147)>)

SPA feito em ReactJS para visualizar _pull requests_ de repositórios publicos.

## Instalação

```bash
git clone https://github.com/luismramirezr/github-pullrequests-explorer.git
cd github-pullrequests-explorer
yarn install
yarn start
```

## Uso e Descrição

Digite o nome do proprietário do repositorio, seguido de _slash_ e o nome do repositório, por exemplo, `reacttraining/history`

Como a API Publica do GitHub limita 10 buscas por hora, ao digitar ao menos 4 caracteres, o SPA irá realizar um _request_ na API do GitHub procurando por repositórios utilizando esses caracteres. De uma forma ideal, poderia ser realizada a busca a cada carectere digitado.

Para reduzir o consumo da API, não são feitos _requests_ adicionais quando a resposta da API é incompleta (paginação). Ainda, foi implementado o uso de `localStorage` para armzenar os resultados das buscas.

Quando um repositório é acessado, este também é salvo no `localStorage` com informações básicas e reapresentado como Repositório Favorito.

Ao acessar o repositório, é possível visualizar a lista de _Pull Requests_ abertas, contendo informações básicas como o título, _labels_, o nome do usuário e o corpo da _Pull Request_, acessado ao expandir as informações básicas.

## Implementações Futuras

- Procurar inicialmente por proprietários no lugar de repositórios
- Procurar por repositórios do proprietário digitado ao inserir `/` após o nome do proprietário
- Implementar processamento de erros da API (_ex, repositório não encontrado, quota excedida, etc_)
- Implementar sistema de autenticação para aumento da quota de requisições da API e visualização de repositórios privados

## Changelog

### 1.0.0 (11/11/2019)

- Distribuição inicial
