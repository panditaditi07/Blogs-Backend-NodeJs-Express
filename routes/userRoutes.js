const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getById,
  getByQuery,
  patchRequest,
  updateBlog,
} = require("../controllers/userController");
router.route("/blogs").get(getAllUsers);
router.route("/getByQuery").get(getByQuery);
router.route("/blogs/:id").get(getById).patch(patchRequest, updateBlog);
module.exports = router;
