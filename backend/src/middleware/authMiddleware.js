const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user" });
  try {
    const decoded = jwt.verify(token, process.env.secret);
    //some more logic in order to get more data like: user, role, permissions, session data
    if (decoded.hasOwnProperty("user")) next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};

const verifyRole = (req, res, next) => {
  return;
};

module.exports = { verifyToken, verifyRole };
