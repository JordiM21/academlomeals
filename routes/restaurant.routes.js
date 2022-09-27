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
	createPostValidators,
} = require("../middlewares/validators.middlewares");
const { protectSession } = require("../middlewares/auth.middlewares");

const RestRouter = express.Router();

RestRouter.get("/", getAllRestaurants);

RestRouter.get("/:id", getRestaurantById);

RestRouter.use(protectSession);

RestRouter.post("/", createRestaurant);

//solo el role: admin
RestRouter.patch("/:id", updateRest);

//solo el role: admin
RestRouter.delete("/:id", deleteRestaurant);

//RESTAURANT'S REVIEWS
RestRouter.post("/reviews/:restaurantId", createReview);

//solo el autor
RestRouter.patch("/reviews/:id", updateReview);

//solo el autor
RestRouter.delete("/reviews/:id", deleteReview);

module.exports = { RestRouter };
