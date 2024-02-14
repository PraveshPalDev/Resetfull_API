import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import UserData from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs";

const app = express();
const port = 4000;

app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to server");
});

// this routes is only web
app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${UserData.map(
        (item) => `<li>${item.first_name} ${item.last_name}</li>`
      ).join("")}
      </ul>
      `;
  return res.status(200).send(html);
});

// here all routes to only other client like mobile and other tools
app.get("/api/users", (req, res) => {
  return res.status(200).send(UserData);
});

// based on id send the user data using paramsID
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const filterDataById = UserData.filter((user) => user.id == userId);
  return res.status(200).send(filterDataById);
});

// based on id send the user data using Query Parameters
app.get("/api/user", (req, res) => {
  const id = req.query.id;
  const filterData = UserData.filter((x) => x.id == id);
  return res.status(200).send(filterData);
});

// based on created data in json file
app.post("/api/users", (req, res) => {
  const data = req.body;

  UserData.push({ id: UserData.length + 1, ...data });
  const jsonData = JSON.stringify(UserData);

  fs.writeFile("./MOCK_DATA.json", jsonData, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Error writing file");
    }

    console.log("Data written to file successfully");
    return res.status(201).send("Successfully created data");
  });
});

// update the data based on id
app.put("/api/users", (req, res) => {
  const data = req.body;

  // Find the user with the provided ID
  const userToUpdate = UserData.find((x) => x.id == data.id);
  if (!userToUpdate) {
    return res.status(404).send("User not found");
  }

  // update the data in json file
  Object.assign(userToUpdate, data);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(UserData, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error updating user");
    }
    return res.status(200).send("User updated successfully");
  });
});

// replace the data based on id
app.patch("/api/users", (req, res) => {
  const updatedUserData = req.body;

  const userIndex = UserData.findIndex(
    (user) => user.id === updatedUserData.id
  );

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  // Replace the user's data with the updated data
  UserData[userIndex] = updatedUserData;

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(UserData, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error updating user");
    }
    return res.status(200).send("User updated successfully");
  });
});

// delete the data based on id
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  // Find the index of the user with the provided ID
  const index = UserData.findIndex((user) => user.id == id);

  if (index !== -1) {
    const deletedUser = UserData.splice(index, 1)[0];
    console.log(`\n this user is delete in json file =>`, deletedUser);
    return res.status(200).send("User deleted successfully");
  } else {
    return res.status(404).send("User not found");
  }
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
