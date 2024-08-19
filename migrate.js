const fs = require("fs");
const csv = require("csv-parser");
const generatePassword = require("generate-password");

// Function to create user in Okta
const createUser = async (user) => {
  const userPayload = {
    profile: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      login: user.login,
    },
    credentials: {
      password: { value: user.password },
    },
  };

  try {
    const response = await fetch(
      `https://teachempowered.okta.com/api/v1/users?activate=true`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `SSWS 00ItSg4t5TpGX4RWragxvx4bGVyPBCuhPHrN7SHRUF`,
        },
        body: JSON.stringify(userPayload),
      }
    );
    const parsedVal = await response.json();

    console.log(`User ${user.email} created successfully:`, parsedVal);
  } catch (error) {
    console.error(
      `Error creating user ${user.email}:`,
      JSON.stringify(error),
      error.response ? error.response.data : error.message
    );
  }
};

// Function to generate a random password
function generateRandomPassword() {
  return generatePassword.generate({
    length: 8,
    numbers: true,
    uppercase: true,
    lowercase: true,
    strict: true,
  });
}

// Read CSV file and create users
fs.createReadStream("users.csv")
  .pipe(csv())
  .on("data", (row) => {
    const user = {
      firstName: row["firstName"],
      lastName: row["lastName"],
      email: row["email"],
      login: row["login"],
      profileUrl: row["profileUrl"],
      password: generateRandomPassword(),
    };
    createUser(user);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
