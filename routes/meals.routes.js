const express = require("express");

// Controllers
const {
	getAllMeals,
	getMealById,
	createMeal,
	updateMeal,
	deleteMeal,
} = require("../controllers/meal.controller");
const { protectSession } = require("../middlewares/auth.middlewares");

// Middlewares

const mealRouter = express.Router();

mealRouter.get("/", getAllMeals);

mealRouter.get("/:id", getMealById);

mealRouter.use(protectSession);

mealRouter.post("/:id", createMeal);

//only the admin
mealRouter.patch("/:id", updateMeal);

//only the admin
mealRouter.delete("/:id", deleteMeal);

module.exports = { mealRouter };
