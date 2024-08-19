const axios = require("axios");
const qs = require("qs");

// get access token from salseforce
const GetAccessToken = async () => {
  const url = process.env.SALESFORCE_TOKEN_URL;
  const data = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
  };

  try {
    const result = await axios.post(url, qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return result.data;
  } catch (error) {
    return false;
  }
};

module.exports = {
  GetAccessToken,
};
