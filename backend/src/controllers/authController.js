const authService = require('../services/authService');
const asyncHandler = require('express-async-handler');

// @desc    register new user
// @route   POST /v1/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please enter all fields'
    });
  }

  const newUser = {
    name,
    email,
    password
  };

  try {
    const userCreate = await authService.register(newUser);
    if (userCreate.success) {
      res.status(201).send({ status: 'OK', data: userCreate });
    } else {
      res.status(400).send({ status: 'ERROR', error: userCreate.error });
    }
  } catch (error) {
    res.status(400).send({ status: 'ERROR', error: error.message });
  }
});

// @desc    Authenticate user
// @route   POST /v1/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { body } = req;
  if (!body.email || !body.password) {
    return;
  }

  const user = {
    email: body.email,
    password: body.password
  };

  try {
    const loginResult = await authService.login(user);
    if (loginResult.success) {
      res.status(201).send({ status: 'OK', data: loginResult });
    } else {
      res.status(400).send({ status: 'ERROR', data: loginResult.error });
    }
  } catch (error) {
    res.status(400).send({ status: 'ERROR', error: error.message });
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { body } = req;
  console.log(body.email);
  const user = {
    email: body.email
  };

  try {
    const userGetMe = await authService.getMe(user);

    if (userGetMe.success) {
      res.status(201).send({ status: 'OK', data: userGetMe });
    } else {
      res.status(400).send({ status: 'ERROR', data: userGetMe.error });
    }
  } catch (error) {
    res.status(400).send({ status: 'ERROR', error: error.message });
  }
});

module.exports = {
  register,
  login,
  getMe
};
