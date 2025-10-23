const fetch = require("node-fetch");

const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;
const GITHUB_USERNAME = "itsmrnatural";

/**
 * API handler to fetch GitHub repositories including those where user is a contributor
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {Promise<void>} Sends repository data or error response
 */
const handler = async (req, res) => {
  try {
    // First, try to fetch all repos including contributed ones using authenticated endpoint
    const allReposResponse = await fetch(
      `https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (allReposResponse.ok) {
      const allRepos = await allReposResponse.json();
      
      // Mark repos where user is not the owner as contributor repos
      const reposWithContributorFlag = allRepos.map((repo) => {
        if (repo.owner.login.toLowerCase() !== GITHUB_USERNAME.toLowerCase()) {
          repo.isContributor = true;
        }
        return repo;
      });

      res.send(reposWithContributorFlag);
      return;
    }

    // If authenticated endpoint fails, fall back to public endpoint
    console.warn(`Authenticated endpoint failed with ${allReposResponse.status}, falling back to public repos`);
    
    const publicReposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!publicReposResponse.ok) {
      throw new Error(`GitHub API returned ${publicReposResponse.status} status code`);
    }

    const repositories = await publicReposResponse.json();
    res.send(repositories);
    
  } catch (error) {
    console.error("Error fetching repositories:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default handler;
