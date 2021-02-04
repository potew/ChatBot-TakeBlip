const axios = require('axios').default

// Obtém os 5 repositórios de linguagem C# mais antigos da Take, 
// ordenados de forma crescente por data de criação;

const getRepos = async () => {
  const response = await axios({
    method: 'get',
    url: 'https://api.github.com/orgs/takenet/repos',
    responseType: 'json',
    params: {
      sort: 'created',
      direction: 'asc',
      per_page: 5,
    },
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  return response;
}

module.exports = {
  getRepos,
}
