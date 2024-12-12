const { Router } = require("express");
const { orderController } = require("../controllers/order.controller");
const router = Router();

router.post("/", orderController.add);
router.get("/order/:id", orderController.getById);
router.get("/", orderController.getAll);

module.exports = router; 
