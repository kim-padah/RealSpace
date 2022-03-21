//const mongoose, { Schema } = require('mongoose');
const { mongoose, Schema } = require('mongoose');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
  nickname: String,
  adminCode: String,
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bycrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bycrypt.compare(password, this.hashedPassword);
  return result; //true or false
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
      nickname: this.nickname,
      adminCode: this.adminCode,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
