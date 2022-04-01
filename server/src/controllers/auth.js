const User = require('../models/user');
const Joi = require('joi');

const register = async (req, res) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
    nickname: Joi.string().required(),
    adminCode: Joi.string(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const { username, password, nickname, adminCode } = req.body;

  try {
    const exists = await User.findByUsername(username);
    //check user already exist or not
    if (exists) {
      res.status(409).send({ message: `"${username}" is already in used` }); //409 conflict return in case of already exist
      return;
    }

    const user = new User({
      username,
      nickname,
      adminCode,
    });
    await user.setPassword(password);
    await user.save();
    const serializedData = user.serialize();
    const token = user.generateToken();
    res
      .status(200)
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
        httpOnly: true,
      })
      .send(serializedData);
  } catch (e) {
    res.status(500).send(e);
  }
};
500;
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).send({ message: 'please input username and password' }); //Unauthorized
    return;
  }
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      res.status(401).send({ message: 'user not exist' });
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      res.status(401).send({ message: 'wrong password' });
      return;
    }
    const serializedData = user.serialize();
    const token = user.generateToken();
    res
      .status(200)
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
        httpOnly: true,
      })
      .send(serializedData);
  } catch (e) {
    res.status(500).send(e);
  }
};

const check = async (req, res) => {
  //jwtAuthmiddleware에서 인증통과시 req에 user를 넣어줌
  if (!req.user.username) {
    res.status(401).send({ message: 'unauthorized' });
    return;
  }
  res.status(200).send(req.user);
};

const logout = async (req, res) => {
  //204 no content
  res.cookie('access_token').status(204).end();
  // res.clearCookie('access_token').status(204).end();
};

module.exports = { register, login, check, logout };
