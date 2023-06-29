function getTokenFrom(request) {
  const auth = request.get("authorization");
  const scheme = "Bearer ";

  if (auth && auth.startsWith(scheme)) {
    return auth.replace(scheme, "");
  }

  return null;
}

function tokenExtractor(request) {
  request["token"] = getTokenFrom(request);
  next();
}

module.exports = tokenExtractor;
