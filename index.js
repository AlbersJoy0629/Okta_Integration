const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// custom routes
const oktaRoutes = require("./routes/okta");
const authRoutes = require("./routes/salesforce/auth");
const contactRoutes = require("./routes/salesforce/contacts");
const notificationRoutes = require("./routes/salesforce/notification");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", oktaRoutes);
app.use("/get-token", authRoutes);
app.use("/contact", contactRoutes);
app.use("/notification", notificationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
