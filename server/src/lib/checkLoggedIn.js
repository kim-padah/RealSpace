const checkLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({ message: 'Unauthorized' }); //Unauthorized
    return;
  }
  return next();
};

module.exports = checkLoggedIn;
