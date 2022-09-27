const { Order } = require("../models/order.model");

const getMyOrders = async (req, res) => {
	try {
		const myOrders = await Order.findAll({
			where: { status: "active", userId: req.sessionUser.id },
		});
		if (!myOrders) {
			return (
				res.status(400),
				json({
					status: "error",
					message: "You dont have any order yet",
				})
			);
		}
		res.status(200).json({
			status: "success",
			data: {
				myOrders,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createOrder = async (req, res) => {
	const { quantity, mealId } = req.body;

	const newOrder = await User.create({
		quantity,
		mealId,
	});

	res.status(201).json({
		status: "success",
		data: { newOrder },
	});
};

const updateOrder = async (req, res) => {
	try {
		const { id } = req.params;

		const order = await Order.findOne({ where: { id } });

		await order.update({ status: "completed" });

		res.status(200).json({
			status: "success",
			data: { order },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteOrder = async (req, res) => {
	try {
		const { id } = req.params;

		const order = await Order.findOne({ where: { id } });

		await order.update({ status: "cancelled" });

		res.status(200).json({
			status: "success",
			data: { order },
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = { createOrder, getMyOrders, updateOrder, deleteOrder };
