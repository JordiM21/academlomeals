// Models
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

const getAllMeals = async (req, res) => {
	try {
		const meals = await Meal.findAll({
			where: { status: "active" },
			include: {
				model: Restaurant,
				required: false,
			},
		});

		res.status(200).json({
			status: "success",
			data: {
				meals,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const getMealById = async (req, res) => {
	try {
		const { id } = req.params;

		const meal = await Meal.findOne({
			where: { id },
			include: {
				model: Restaurant,
				required: false,
			},
		});

		// If user doesn't exist, send error message
		if (!meal) {
			return res.status(404).json({
				status: "error",
				message: "Meal not found",
			});
		}

		const meals = await meal.findOne({
			where: { status: "active" },
		});

		res.status(200).json({
			status: "success",
			data: {
				meals,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createMeal = async (req, res) => {
	try {
		const { name, price } = req.body;

		const { id } = req.params;

		const newMeal = await Meal.create({
			name,
			price,
			restaurantId: id,
		});

		res.status(201).json({
			status: "success",
			data: { newMeal },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateMeal = async (req, res) => {
	try {
		const { id } = req.params;

		const meal = await Meal.findOne({ where: { id } });

		// If user doesn't exist, send error message
		if (!meal) {
			return res.status(404).json({
				status: "error",
				message: "Meal not found",
			});
		}
		const { name, price } = req.body;

		await meal.update({ name, price });

		res.status(200).json({
			status: "success",
			data: { meal },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteMeal = async (req, res) => {
	try {
		const { id } = req.params;

		const meal = await Meal.findOne({ where: { id } });

		// If user doesn't exist, send error message
		if (!meal) {
			return res.status(404).json({
				status: "error",
				message: "meal not found",
			});
		}
		await meal.update({ status: "deleted" });

		res.status(200).json({
			status: "success",
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllMeals,
	getMealById,
	createMeal,
	updateMeal,
	deleteMeal,
};
