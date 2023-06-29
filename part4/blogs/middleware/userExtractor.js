const User = require("../models/user");

async function userExtractor(request) {
  const user = await User.findById(request.token.id);
  request["user"] = user;
  next();
}

module.exports = userExtractor;
