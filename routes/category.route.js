const { categoryController } = require("../controllers/category.controller");
const { Router } = require("express");
const router = Router();

router.post("/", categoryController.add);
router.get("/category/:id", categoryController.getById);
router.delete("/category/:id", categoryController.delete);
router.get("/", categoryController.getAll);

module.exports = router;
