const jwt = require("jsonwebtoken");

const createToken = async (user) => await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });

const validateToken = async (token) => await jwt.verify(token, process.env.JWT_SECRET);

module.exports = { createToken, validateToken };
