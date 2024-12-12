const Order = require("../models/Order.model");
const handleError = require("./lib/handleError");

module.exports.orderController = {
  add: async (req, res) => {
    try {
      const data = await Order.create(req.body);
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getAll: async (_, res) => {
    try {
      const data = await Order.find();
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const data = await Order.findById(req.params.id);
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },
};
