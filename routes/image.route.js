const { upload } = require("../config/multer.config");
const { imageController } = require("../controllers/image.controller");
const { Router } = require("express");
const router = Router();

router.post("/upload", upload.single("image"), imageController.add);

module.exports = router;
