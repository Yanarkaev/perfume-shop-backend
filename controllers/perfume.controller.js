const Perfume = require("../models/Perfume.model");
const handleError = require("./lib/handleError");
const mongoose = require("mongoose");

module.exports.perfumeController = {
  add: async (req, res) => {

    // вычислить скидку сразу!!! TODO
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

  // получить количество продуктов брендов категорий алоаылвдоалдыво

  getPart: async (req, res) => {
    const {
      name,
      categoryIds,
      priceMin,
      priceMax,
      brandIds,
      limit = 15,
      page = 1,
    } = req.query;

    const startIndex = (page - 1) * limit;

    let matchStage = {};
    let andConditions = [];

    if (priceMin) {
      matchStage.price = { ...matchStage.price, $gte: Number(priceMin) };
    }
    if (priceMax) {
      matchStage.price = { ...matchStage.price, $lte: Number(priceMax) };
    }

    if (brandIds) {
      const brandIdsArray = brandIds
        .replace(/\[|\]/g, "")
        .split(",")
        .filter((id) => mongoose.isValidObjectId(id)); // Проверка на валидность ObjectId
      if (brandIdsArray.length > 0) {
        andConditions.push({
          brand: {
            $in: brandIdsArray.map((id) => new mongoose.Types.ObjectId(id)),
          },
        });
      }
    }

    if (categoryIds) {
      const categoryIdsArray = categoryIds
        .replace(/\[|\]/g, "")
        .split(",")
        .filter((id) => mongoose.isValidObjectId(id)); // Проверка на валидность ObjectId
      if (categoryIdsArray.length > 0) {
        andConditions.push({
          categories: {
            $in: categoryIdsArray.map((id) => new mongoose.Types.ObjectId(id)),
          },
        });
      }
    }

    if (andConditions.length > 0) {
      matchStage.$and = andConditions;
    }

    let aggregationPipeline = [
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      { $unwind: "$brand" },

      {
        $lookup: {
          from: "categories", // Коллекция категорий
          localField: "categories", // Поле в продукте (массив категорий)
          foreignField: "_id", // Поле в коллекции категорий
          as: "categories", // Название нового поля с раскрытыми категориями
        },
      },
      {
        $match: {
          $or: [
            { name: { $regex: new RegExp(name, "i") } }, // Поиск по названию продукта
            { "brand.name": { $regex: new RegExp(name, "i") } }, // Поиск по названию бренда
          ],
        },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          __v: 0, // Исключаем поле __v из продукта
          "brand.__v": 0, // Исключаем поле __v из бренда
          "categories.__v": 0, // Исключаем поле __v из категорий
        },
      },
    ];

    if (priceMin || priceMax) {
      aggregationPipeline.push({
        $sort: { price: 1 },
      });
    }

    try {
      const products = await Perfume.aggregate(aggregationPipeline);
      const total = await Perfume.countDocuments(matchStage);

      res.json({
        total: total,
        currentPage: page,
        perPage: limit,
        totalPages: Math.ceil(total / limit),
        list: products,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await Perfume.findById(req.params.id)
        .populate("brand")
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

  getByCategory: async (req, res) => {
    try {
      const data = await Perfume.find({
        categoryId: req.params.categoryId,
      })
        .populate("brand")
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
        is_hit: true,
      })
        .populate("brand")
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
        is_new: true,
      })
        .populate("brand")
        .select("-__v");
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },

  getDiscounts: async (req, res) => {
    try {
      const data = await Perfume.find({ discount: { $gt: 0 } })
        .populate("brand")
        .sort({ discount: -1 })
        .select("-__v");
      res.json(data);
    } catch (error) {
      handleError(res, error);
    }
  },
};
