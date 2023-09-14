const to = require('await-to-js').default;
const { sign, verify } = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/error');
const constants = require('../constants');

const generateJWT = (payload, key,expiry) =>
  sign(payload, key, { expiresIn: expiry });

const getTokenFromHeader = async (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  
  const error = new ErrorHandler(constants.ERRORS.AUTH, {
    statusCode: 401,
    message: 'Missing or invalid authentication header',
  });

  throw error;
};

const getTokenFromUrl = async (req) => {
    if (req.query.token) {
      return req.query.token;
    }
    
    const error = new ErrorHandler(constants.ERRORS.AUTH, {
      statusCode: 401,
      message: 'Missing or invalid authentication token',
    });
  
    throw error;
  };

const verifyToken = async (token, key) => verify(token, key);

const authMiddlewareForLogin = async (req, res, next) => {
  const [err, token] = await to(getTokenFromHeader(req));
  if (err) {
    next(err);
  }

  const [err2, payload] = await to(verifyToken(token, process.env.JWT_SECRET_AUTH));
  if (err2) {
    const error = new ErrorHandler(constants.ERRORS.AUTH, {
      statusCode: 401,
      errStack: err2,
      message: 'JWT authentication failed',
    });
    next(error);
  }
  res.locals.decode = payload;
  next();
};

const authMiddlewareForEmailVerification = async (req, res, next) => {
    const [err, token] = await to(getTokenFromHeader(req));
    if (err) {
      next(err);
      return;
    }
  
    const [err2, payload] = await to(verifyToken(token, process.env.JWT_SECRET_EMAIL));
    if (err2) {
      const error = new ErrorHandler(constants.ERRORS.AUTH, {
        statusCode: 401,
        errStack: err2,
        message: 'JWT authentication failed',
      });
      next(error);
    }
    res.locals.decode = payload;
    next();
}

module.exports = { generateJWT, verifyToken, getTokenFromHeader, authMiddlewareForLogin, authMiddlewareForEmailVerification };