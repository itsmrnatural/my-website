const fetch = require("isomorphic-unfetch");

const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;

export default async (req, res) => {
  try {
    const response = await fetch("https://api.github.com/users/github/repos", {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status} status code`);
    }

    const repositories = await response.json();
    res.send([...repositories]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
