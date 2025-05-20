const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
};

// const { JWT_SECRET = "dev-secret" } = process.env;

// console.log(JWT_SECRET);
// module.exports = {
//   JWT_SECRET: "jeep-canada-is-my-stong-key",
// };
