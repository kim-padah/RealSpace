const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: decoded._id,
      username: decoded.username,
      nickname: decoded.nickname,
      adminCode: decoded.adminCode,
    };
    const now = Math.floor(Date.now() / 1000);
    //token reissue
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    return next();
  }
};

module.exports = jwtAuthMiddleware;
