const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const express = require('express');

const register = asyncHandler(async (newUser) => {
  try {
    const { name, email, password } = newUser;
    //Verificar si existe el usuario
    const userExist = await User.findOne({ email });
    if (userExist) {
      return {
        success: false,
        error: 'User already exists'
      };
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (user) {
      return {
        success: true,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email
        }
      };
    } else {
      return {
        success: false,
        error: 'Error creating user'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

const login = asyncHandler(async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });

  try {
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        success: true,
        data: {
          token: generateToken(user._id),
          _id: user.id,
          name: user.name,
          email: user.email
        }
      };
    } else {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

const getMe = asyncHandler(async (userData) => {
  const { email } = userData;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return {
        success: true,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email
        }
      };
    } else {
      return {
        success: false,
        error: 'Something went wrong!'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

module.exports = {
  login,
  register,
  getMe
};
