const Router = require("express");
const {
  GetAllNotificationBanners,
  GetNotificationBanner,
  UpdateNotificationBanner,
  CreateNotificationBanner,
  DeleteNotificationBanner,
} = require("../../../controllers/salesforce/notification");

const notificationRoutes = Router();

notificationRoutes.get("/", GetAllNotificationBanners);
notificationRoutes.get("/:bannerId", GetNotificationBanner);
notificationRoutes.put("/:bannerId", UpdateNotificationBanner);
notificationRoutes.post("/create", CreateNotificationBanner);
notificationRoutes.delete("/:bannerId", DeleteNotificationBanner);

module.exports = notificationRoutes;
