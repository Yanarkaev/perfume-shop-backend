const Brand = require("../models/Brand.model");
const Perfume = require("../models/Perfume.model");
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

  // getAll: async (_, res) => {
  //   try {
  //     const data = await Brand.find().sort({ name: 1 });
  //     res.json(data);
  //   } catch (error) {
  //     handleError(res, error);
  //   }
  // },

  getAll: async (_, res) => {
    try {
      const data = await Brand.aggregate([
        {
          $lookup: {
            from: "perfumes",
            localField: "_id",
            foreignField: "brand",
            as: "perfumes",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            total: { $size: "$perfumes" }, 
          },
        },
        {
          $sort: { name: 1 },
        },
      ]);

      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },
};
