const { brandController } = require("../controllers/brand.controller");
const { Router } = require("express");
const router = Router();

router.post("/", brandController.add);
router.get("/", brandController.getAll);

module.exports = router;
