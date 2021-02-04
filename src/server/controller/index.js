const { getRepos } = require('../services/git-api');

const parseData = async (req, response) => {
  // console.log(req);
  if (!req.body.content) {
    response.status(400).json({ message: 'Blank message' })
  }
  else {
    try {
      const repos = await getRepos()
        .then((response) => response.data)
        .then(json => json
          .filter((repo) => repo.language == 'C#'))
          .catch((err) => console.log(err))

        
      const filteredProps = [];
      for (let i in repos) {
        filteredProps.push({
          name: repos[i].name,
          description: repos[i].description,
          pic_url: repos[i].owner.avatar_url
        })
      };

      return repos
        ? response.status(200).json(filteredProps)
        : response.status(503).json({ message: 'Service unavailable'})

    } catch (error) {
      response.status(500).json({ message: error })
    }
  }
}

module.exports = {
  parseData,
}
