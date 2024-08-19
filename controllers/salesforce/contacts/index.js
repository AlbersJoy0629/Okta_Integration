const axios = require("axios");
const crypto = require("crypto");
const {
  uploadFile,
  deleteFile,
  getObjectSignedUrl,
} = require("../../../s3.js");

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
// create user in salseforce
const CreateContact = async (body, token) => {
  try {
    const response = await axios.post(
      `${process.env.SALESFORCE_BASEURL}/sobjects/Contact/`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

// get users from salesforce
const GetContact = async (req, res) => {
  try {
    const userId = req.params.userId;
    const accessToken = req.headers.authorization.split(" ")[1];

    const url = `${process.env.SALESFORCE_BASEURL}/query/?q=SELECT+Id,Title__c,Name,FirstName,LastName,Email,Hub_Zip__c,Hub_City__c,Hub_State__c,Hub_CountRy__c,AccountId,Contact_ID__c,OktaID__c,Profile_Builder_Complete__c,Learning_Setting__c,Other_Learning_Setting__c,Grade__c,Grades_Taught2__c,Subject_Taught__c,Subjects_Taught__c,Account.Name,conference360__Image_URL__c+from+Contact+WHERE+OktaID__c+=+'${userId}'`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(200).json(response.data.records[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update user in salesforce
const UpdateContact = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const contactId = req.params.contactId;

    const response = await axios.patch(
      `${process.env.SALESFORCE_BASEURL}/sobjects/Contact/${contactId}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// upload user picture to salesforce
const UploadUserImage = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const contactId = req.params.contactId;

    const bucketName = process.env.AWS_BUCKET_NAME;

    const file = req.file;
    const imageName = generateFileName();

    console.log("file", file);

    const result = await uploadFile(
      bucketName,
      file.buffer,
      imageName,
      file.mimetype
    );
    const imageUrl = `https://${bucketName}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${imageName}`;

    const formate = JSON.stringify({
      conference360__Image_URL__c: imageUrl,
    });
    const response = await axios.patch(
      `${process.env.SALESFORCE_BASEURL}/sobjects/Contact/${contactId}`,
      formate,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json({ imageURL: imageUrl });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  CreateContact,
  GetContact,
  UpdateContact,
  UploadUserImage,
};
