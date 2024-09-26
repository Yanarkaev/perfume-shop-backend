module.exports = function handleError(res, error) {
  res.json(error.message);
};
