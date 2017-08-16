// Greetings nosy code-reviewer person! So, as you can see below, I'm using 'async functions' for
// my API calls, which are actually an ES8(!) feature, but perfectly safe to use thanks to the
// 'babel-polyfill' that I've got as my first Webpack entry point. Personally, I think async
// functions are feckin' beautiful and a much-needed syntactical improvement over Promises - though
// of course they're just Promises under the hood. Mmmmm, syntactical sugar!
import axios from 'axios';

// 'params' only needed if I start getting rate-limited by GitHub due to any accidentally crazy code
// on my behalf, otherwise it's ignored by the Github API.
const id = 'MY_CLIENT_ID';
const sec = 'MY_SECRET_ID';
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile(username) {
  try {
    const user = await axios.get(`https://api.github.com/users/${username}${params}`);
    return user.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount(repos) {
  return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

async function getUserData(player) {
  try {
    const [profile, repos] = await Promise.all([getProfile(player), getRepos(player)]);
    return {
      profile,
      score: calculateScore(profile, repos)
    };
  } catch (error) {
    console.warn(error);
    return null;
  }
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export default {
  async battle(players) {
    try {
      const userData = await Promise.all(players.map(getUserData));
      return await sortPlayers(userData);
    } catch (error) {
      console.warn(`Error in 'api.battle': ${error}'`);
      return null;
    }
  },

  async fetchPopularRepos(language) {
    try {
      const encodedURI = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
      );
      const response = await axios.get(encodedURI);
      const repos = response.data.items;
      return repos;
    } catch (error) {
      console.warn(`Error in 'api.fetchPopularRepos': ${error}'`);
      return null;
    }
  }
};
