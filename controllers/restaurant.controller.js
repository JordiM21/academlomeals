// Models
const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");

const getAllRestaurants = async (req, res) => {
	try {
		const rest = await Restaurant.findAll({
			where: { status: "active" },
			include: {
				model: Review,
				required: false,
				where: { status: "active" },
			},
		});

		res.status(200).json({
			status: "success",
			data: {
				rest,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const getRestaurantById = async (req, res) => {
	try {
		const { id } = req.params;

		const rest = await Restaurant.findAll({
			where: { id },
			include: {
				model: Review,
			},
		});

		res.status(200).json({
			status: "success",
			data: {
				rest,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createRestaurant = async (req, res) => {
	try {
		const { name, address, rating } = req.body;

		const newRest = await Restaurant.create({
			name,
			address,
			rating,
		});

		res.status(201).json({
			status: "success",
			data: { newRest },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateRest = async (req, res) => {
	try {
		const { name, address } = req.body;
		const { id } = req.params;

		const rest = await Restaurant.findOne({ where: { id } });

		if (!rest) {
			return res.status(404).json({
				status: "error",
				message: "Restaurant not found",
			});
		}

		await rest.update({ name, address });

		res.status(200).json({
			status: "success",
			data: { rest },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteRestaurant = async (req, res) => {
	try {
		const { id } = req.params;

		const rest = await Restaurant.findOne({ where: { id } });

		if (!rest) {
			return res.status(404).json({
				status: "error",
				message: "restaurant not found",
			});
		}

		await res.update({ status: "deleted" });

		res.status(200).json({
			status: "success",
		});
	} catch (error) {
		console.log(error);
	}
};

//REVIEWS PART

const createReview = async (req, res) => {
	try {
		const { restaurantId } = req.params;
		const { comment, rating } = req.body;

		const newRate = await Review.create({
			comment,
			rating,
			restaurantId,
		});

		res.status(201).json({
			status: "success",
			data: { newRate },
		});
	} catch (error) {
		console.log(error);
	}
};

//solo el autor
const updateReview = async (req, res) => {
	try {
		const { id } = req.params;
		const { comment, rating } = req.body;

		const review = await Review.findOne({ where: { id } });

		if (!review) {
			return res.status(404).json({
				status: "error",
				message: "Review not found",
			});
		}

		await review.update({ comment, rating });

		res.status(200).json({
			status: "success",
			data: { review },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteReview = async (req, res) => {
	try {
		const { id } = req.params;

		const review = await Review.findOne({ where: { id } });

		if (!review) {
			return res.status(404).json({
				status: "error",
				message: "Review not found",
			});
		}

		await review.update({ status: "deleted" });

		res.status(200).json({
			status: "success",
			data: { review },
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllRestaurants,
	getRestaurantById,
	createRestaurant,
	updateRest,
	deleteRestaurant,
	createReview,
	updateReview,
	deleteReview,
};
