const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
		const errorMessages = errors.array().map((err) => err.msg);

		const message = errorMessages.join(". ");

		return res.status(400).json({
			status: "error",
			message,
		});
	}

	next();
};

const createUserValidators = [
	body("name")
		.isString()
		.withMessage("Name must be a string")
		.notEmpty()
		.withMessage("Name cannot be empty")
		.isLength({ min: 3 })
		.withMessage("Name must be at least 3 characters"),
	body("email").isEmail().withMessage("Must provide a valid email"),
	body("password")
		.isString()
		.withMessage("Password must be a string")
		.notEmpty()
		.withMessage("Password cannot be empty")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters"),
	checkValidations,
];

const createRestaurantValidator = [
	body("name")
		.isString()
		.withMessage("Title must be a string")
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 characters"),
	body("address")
		.isString()
		.withMessage("address must be a string")
		.isLength({ min: 3 })
		.withMessage("The address must have at least 3 characters"),
	checkValidations,
];

const createMealValidator = [
	body("name")
		.isString()
		.withMessage("Name must be a string")
		.isLength({ min: 3 })
		.withMessage("Name must be at least 3 characters"),
	body("price").isNumeric().withMessage("price must be a number"),
	checkValidations,
];

module.exports = {
	checkValidations,
	createUserValidators,
	createRestaurantValidator,
	createMealValidator,
};
