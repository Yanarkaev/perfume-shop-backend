const Image = require("../models/Image");
const handleError = require("./lib/handleError");



module.exports.imageController = {
  add: async (req, res) => {
    try {
      const image = new Image({
        filename: req.file.filename,
        path: req.file.path,
      });

      await image.save();
      res.status(201).json(image);
    } catch (error) {
      handleError(res, error);
    }
  },
};
