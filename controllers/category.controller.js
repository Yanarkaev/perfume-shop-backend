const Category = require("../models/Category.model");
const handleError = require("./lib/handleError");

module.exports.categoryController = {
  add: async (req, res) => {
    try {
      const data = await Category.create(req.body);
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const data = await Category.findByIdAndDelete(req.params.id);
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getAll: async (_, res) => {
    try {
      const data = await Category.find().sort({ name: 1 });
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },
  
  getById: async (req, res) => {
    try {
      const data = await Category.findById(req.params.id);
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },
};
