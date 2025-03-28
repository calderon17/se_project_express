const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { BAD_REQUEST_CODE } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(BAD_REQUEST_CODE)
      .send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = { _id: payload._id };

    return next();
  } catch (err) {
    return res.status(BAD_REQUEST_CODE).send({ message: "Invalid token" });
  }
};
module.exports = { auth };
