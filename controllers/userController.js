const express = require("express");
const fs = require("fs");
const path = require("path");

const USERS = path.join(__dirname, "..", "data", "users.json");
const userData = JSON.parse(fs.readFileSync(USERS, "utf-8"));

const getAllUsers = (req, res, next) => {
  if (userData.length == 0) {
    res.status(404).json({
      status: "Unsuccessful",
      data: [],
    });
  }
  res.status(200).json({
    status: "Successful",
    data: [userData],
  });
};
const getById = (req, res, next) => {
  let user = userData.find((user) => {
    return user.id === req.params.id;
  });
  if (user) {
    res.status(200).json({
      status: "Successful",
      data: [user],
    });
  } else {
    res.status(200).json({
      status: "Blog not found",
    });
  }
  next();
};

const getByQuery = (req, res) => {
  let queryParameter = req.query;
  res.json(queryParameter);
};

const patchRequest = (req, res, next) => {
  flag = false;
  const updateProperties = ["content", "title", "author", "imageUrl"];
  let result = updateProperties.forEach((key) => {
    if (req.body[key]) {
      flag = true;
    }
  });
  if (!flag) {
    res.status(400).json({
      status: "Unsuccessful",
      message: "request body is not valid",
    });
  } else {
    next();
  }
};

const updateBlog = (req, res, next) => {
  let user = userData.find((user) => {
    return user.id === req.params.id;
    console.log(user);
  });
  if (user) {
    user.content = req.body.content;
    user.title = req.body.title;
    fs.writeFile(USERS, JSON.stringify(userData, null, 2), (err) => {
      if (err) {
        res.status(500).json({
          status: "unsuccessful",
          message: "Error in updating file",
        });
        return err;
      }
    });
    res.status(200).json({
      message: "successful",
      data: userData,
    });
  }
  next();
};

module.exports.getAllUsers = getAllUsers;
module.exports.getById = getById;
module.exports.getByQuery = getByQuery;
module.exports.patchRequest = patchRequest;
module.exports.updateBlog = updateBlog;
