const Brand = require("../models/Brand.model");
const handleError = require("./lib/handleError");

module.exports.brandController = {
  add: async (req, res) => {
    try {
      const data = await Brand.create(req.body);
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getAll: async (_, res) => {
    try {
      const data = await Brand.find();
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },
};
