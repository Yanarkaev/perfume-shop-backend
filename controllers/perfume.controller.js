const Perfume = require("../models/Perfume.model");
const handleError = require("./lib/handleError");

module.exports.perfumeController = {
  add: async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    try {
      const fullImageUrl = `${req.protocol}://${req.get("host")}/${
        req.file.path
      }`;

      const data = await Perfume.create({
        ...req.body,
        imageURL: fullImageUrl,
      });

      res.json(data);
    } catch (error) {
      handleError(res, error);
    }

    // res.json(req)
  },

  getAll: async (_, res) => {
    try {
      const data = await Perfume.find()
        .populate("brand")
        .populate("categories")
        .select("-__v");
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getPart: async (req, res) => {
    const { name, categoryId, limit = 15, page = 1 } = req.query;
    const total = await Perfume.countDocuments();
    const startIndex = (page - 1) * limit;

    let products;
    try {
      if (!name && !categoryId) {
        products = await Perfume.find()
          .populate("brand")
          .populate({
            path: "categories",
            select: "-__v",
          })
          .select("-__v")
          .limit(limit)
          .skip(startIndex);
      } else if (name && categoryId) {
        products = await Perfume.find({
          name: { $regex: new RegExp(name, "i") },
          categoryId,
        })
          .populate("brand")
          .populate({
            path: "categories",
            select: "-__v",
          })
          .select("-__v")
          .limit(limit)
          .skip(startIndex);
      } else if (name) {
        products = await Perfume.find({
          name: { $regex: new RegExp(name, "i") },
        })
          .populate("brand")
          .populate({
            path: "categories",
            select: "-__v",
          })
          .select("-__v")
          .limit(limit)
          .skip(startIndex);
      } else if (categoryId) {
        products = await Perfume.find({
          categoryId,
        })
          .populate("brand")
          .populate({
            path: "categories",
            select: "-__v",
          })
          .select("-__v")
          .limit(limit)
          .skip(startIndex);
      }

      // Возвращаем результаты пагинации
      res.json({
        total: total,
        currentPage: page,
        perPage: limit,
        totalPages: Math.ceil(total / limit),
        list: products,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const data = await Perfume.findById(req.params.id)
        .populate({
          path: "categories",
          select: "-__v",
        })
        .select("-__v");
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getByCategory: async (req, res) => {
    try {
      const data = await Perfume.find({
        categoryId: req.params.categoryId,
      })
        .select("-__v")
        .populate({
          path: "categories",
          select: "-__v",
        });
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getHits: async (req, res) => {
    try {
      const data = await Perfume.find({
        isHit: true,
      })
        .populate({
          path: "categories",
          select: "-__v",
        })
        .select("-__v");
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getNews: async (req, res) => {
    try {
      const data = await Perfume.find({
        isNew: true,
      }).select("-__v");
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getDiscounts: async (req, res) => {
    try {
      const data = await Perfume.find({ discount: { $gt: 0 } })
        .sort({ discount: -1 })
        .select("-__v");
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },
};
