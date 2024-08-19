const Router = require("express");

const { GetAccessToken } = require("../../../controllers/salesforce/auth");
const authRoutes = Router();

authRoutes.get("/getToken", async (req, res) => {
  try {
    const accessToken = await GetAccessToken();
    res.status(200).json(accessToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = authRoutes;
