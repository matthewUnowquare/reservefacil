const jwt = require("jsonwebtoken");

const createToken = async (user) => await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });

module.exports = { createToken };
