const Router = require("express");
const {
  CreateContact,
  GetContact,
  UpdateContact,
  UploadUserImage,
} = require("../../../controllers/salesforce/contacts");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const contactRoutes = Router();

contactRoutes.post("/create", CreateContact);
contactRoutes.get("/getContact/:userId", GetContact);
contactRoutes.post("/update/:contactId", UpdateContact);
contactRoutes.post(
  "/upload/:contactId",
  upload.single("image"),
  UploadUserImage
);

module.exports = contactRoutes;
