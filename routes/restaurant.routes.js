const express = require("express");

// Controllers
const {
	createRestaurant,
	deleteRestaurant,
	getAllRestaurants,
	getRestaurantById,
	updateRest,
	createReview,
	updateReview,
	deleteReview,
} = require("../controllers/restaurant.controller");

// Middlewares
const {
	createRestaurantValidator,
} = require("../middlewares/validators.middlewares");
const {
	protectSession,
	userIsAdmin,
	protectUsersAccount,
} = require("../middlewares/auth.middlewares");

const RestRouter = express.Router();

RestRouter.get("/", getAllRestaurants);

RestRouter.get("/:id", getRestaurantById);

RestRouter.use(protectSession);

RestRouter.post("/", createRestaurantValidator, createRestaurant);

//solo el role: admin
RestRouter.patch("/:id", userIsAdmin, updateRest);

//solo el role: admin
RestRouter.delete("/:id", userIsAdmin, deleteRestaurant);

//RESTAURANT'S REVIEWS
RestRouter.post("/reviews/:restaurantId", createReview);

//solo el autor
RestRouter.patch("/reviews/:id", protectUsersAccount, updateReview);

//solo el autor
RestRouter.delete("/reviews/:id", protectUsersAccount, deleteReview);

module.exports = { RestRouter };
