const Post = require('../models/post');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Joi = require('joi');
const sanitizeHtml = require('sanitize-html');

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).end();
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).send({ message: 'Not Found' });
      return;
    }
    req.post = post;
    return next();
  } catch (e) {
    res.status(500).send(e);
  }
};

const checkOwnPost = (req, res, next) => {
  const { user, post } = req;

  if (post.user._id.toString() !== user._id) {
    res.status(403).send({ message: 'Forbidden author' });
    return;
  }
  return next();
};

const write = async (req, res) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    thumbnail: Joi.string(),
    images: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const { title, body, thumbnail, images, tags } = req.body;

  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    thumbnail,
    images,
    tags,
    user: req.user,
  });
  try {
    await post.save();
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
  }
};
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

const list = async (req, res) => {
  const { tag, username } = req.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query).sort({ _id: -1 }).exec();
    res
      .status(200)
      .send(posts.map((post) => ({ ...post, body: removeHtmlAndShorten(post.body) })));
  } catch (e) {
    res.status(500).send(e);
  }
};

const read = async (req, res) => {
  res.send(req.post);
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndRemove(id).exec();
    res.status(204).end(); // No Content(success but no need to send res)
  } catch (e) {
    res.status(500).send(e);
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    thumbnail: Joi.string(),
    images: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const nextData = { ...req.body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true, //return updated data
      // false: return before update data
    }).exec();
    if (!post) {
      res.status(404).end();
      return;
    }
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { getPostById, checkOwnPost, write, list, read, remove, update };
