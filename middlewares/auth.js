const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { BAD_REQUEST_CODE } = require("../utils/errors");

const auth = (req, res, next) => {
  // 1. Get authorization from headers
  const { authorization } = req.headers;
  // 2. Check if authorization header exists

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(BAD_REQUEST_CODE)
      .send({ message: "Authorization required" });
  }
  // 3. Verify and extract token
  const token = authorization.replace("Bearer ", "");
  // 4. Verify token with jwt
  try {
    // Verify token and get payload
    const payload = jwt.verify(token, JWT_SECRET);

    // 5. Add payload to request object
    req.user = { _id: payload._id };

    // 6. Move to next middleware
    return next();
  } catch (err) {
    // If token is invalid or expired, return 401
    return res.status(BAD_REQUEST_CODE).send({ message: "Invalid token" });
  }
};
module.exports = { auth };
