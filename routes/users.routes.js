const express = require("express");
const { body, validationResult } = require("express-validator");

// Controllers
const {
	getAllOrders,
	createUser,
	updateUser,
	deleteUser,
	login,
	getOrderById,
} = require("../controllers/users.controller");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const {
	createUserValidators,
} = require("../middlewares/validators.middlewares");
const {
	protectSession,
	protectUsersAccount,
} = require("../middlewares/auth.middlewares");

const usersRouter = express.Router();

usersRouter.post("/signup", createUserValidators, createUser);

usersRouter.post("/login", login);

usersRouter.use(protectSession);
//se aplicará el validar la sesion y el token a las rutas de abajo

usersRouter.get("/orders", getAllOrders);

usersRouter.get("/orders/:id", getOrderById);

usersRouter.patch("/:id", userExists, protectUsersAccount, updateUser);

usersRouter.delete("/:id", userExists, protectUsersAccount, deleteUser);

module.exports = { usersRouter };
