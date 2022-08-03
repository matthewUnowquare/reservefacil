const express = require("express");
const authController = require("../../controllers/authController");
const { protect, verifyToken } = require("../../middleware/authMiddleware");

const router = express.Router();

module.exports = (app) => {
  router.route('/').post(authController.register);
  router.route('/login').post(authController.login);
  router.route('/me').get(protect, authController.getMe);

  app.use('/api/v1/users', router);
};
