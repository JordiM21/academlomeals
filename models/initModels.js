// Models
const { User } = require("./user.model");
const { Meal } = require("./meal.model");
const { Order } = require("./order.model");
const { Restaurant } = require("./restaurant.model");
const { Review } = require("./review.model");

const initModels = () => {
	// 1 User <----> M orders
	User.hasMany(Order, { foreignKey: "userId" });
	Order.belongsTo(User);

	// 1 User <----> M reviews
	User.hasMany(Review, { foreignKey: "userId" });
	Review.belongsTo(User);

	//1 order <--> 1 meal
	Order.hasOne(Meal);
	Meal.belongsTo(Order, { foreignKey: "mealId" });

	// 1 Restaurant <----> M meals
	Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
	Meal.belongsTo(Restaurant);

	//1 Restaurant <---> M reviews
	Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
	Review.belongsTo(Restaurant);
};

module.exports = { initModels };
