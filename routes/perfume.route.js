const { upload } = require("../config/multer.config");
const { perfumeController } = require("../controllers/perfume.controller");
const { Router } = require("express");
const router = Router();

router.post("/", upload.single("image"), perfumeController.add);
router.get("/perfume/:id", perfumeController.getById);
router.get("/all", perfumeController.getAll);
router.get("/news", perfumeController.getNews);
router.get("/hits", perfumeController.getHits);
router.get("/discounts", perfumeController.getDiscounts);
router.get("/", perfumeController.getPart);
router.get("/category/:categoryId", perfumeController.getByCategory);

module.exports = router;
