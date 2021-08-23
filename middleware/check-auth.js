const jwt = require('jsonwebtoken');

const ErrorService = require('../utils/error-service');

module.exports = (req, res, next) => {
  // const header = req.headers.authorization; // or
  const header = req.get('Authorization');
  if (!header) {
    throw ErrorService(401, "Auth headers weren't send");
  }

  const token = header.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);

  if (!decodedToken) {
    throw ErrorService(401, 'Auth failed.');
  }
  req.userId = decodedToken.userId;
  next();
};
