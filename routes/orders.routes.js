const express = require("express");

// Controllers
const {
	createOrder,
	deleteOrder,
	getMyOrders,
	updateOrder,
} = require("../controllers/order.controller");
const { protectSession } = require("../middlewares/auth.middlewares");

// Middlewares

const orderRouter = express.Router();

orderRouter.use(protectSession);

orderRouter.post("/", createOrder);

orderRouter.get("/me", getMyOrders);

orderRouter.patch("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);

module.exports = { orderRouter };
