const express = require("express");

// Controllers
const {
	getAllMeals,
	getMealById,
	createMeal,
	updateMeal,
	deleteMeal,
} = require("../controllers/meal.controller");
const {
	protectSession,
	userIsAdmin,
} = require("../middlewares/auth.middlewares");

const {
	createMealValidator,
} = require("../middlewares/validators.middlewares");

// Middlewares

const mealRouter = express.Router();

mealRouter.get("/", getAllMeals);

mealRouter.get("/:id", getMealById);

mealRouter.use(protectSession);

mealRouter.post("/:id", createMealValidator, createMeal);

//only the admin
mealRouter.patch("/:id", userIsAdmin, updateMeal);

//only the admin
mealRouter.delete("/:id", userIsAdmin, deleteMeal);

module.exports = { mealRouter };
