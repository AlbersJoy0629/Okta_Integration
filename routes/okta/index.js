const Router = require("express");
const {
  UserDetail,
  UpdateUserProfile,
  RegisterUser,
  GetAllUsers,
} = require("../../controllers/okta");

const oktaRoutes = Router();

oktaRoutes.post("/register", RegisterUser);
oktaRoutes.get("/all-user", GetAllUsers);
oktaRoutes.get("/:userId", UserDetail);
oktaRoutes.post("/:userId", UpdateUserProfile);

module.exports = oktaRoutes;
