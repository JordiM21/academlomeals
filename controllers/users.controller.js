const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");
const { Order } = require("../models/order.model");

dotenv.config({ path: "./config.env" });

//como obtengo las orders de un usario?
const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.findAll({
			attributes: { exclude: ["password"] },
			where: { status: "active", userId: req.sessionUser.id },
		});

		res.status(200).json({
			status: "success",
			data: {
				orders,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const getOrderById = async (req, res) => {
	try {
		const { id } = req.params;
		const order = Order.findOne({
			where: {
				status: "active",
				userId: req.sessionUser.id,
				id,
			},
		});
		res.status(200).json({
			status: "success",
			data: {
				order,
			},
		});
	} catch (error) {
		console.log(eror);
	}
};

const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		//encript password when creating the user
		//generamos el salto y lo almacenamos para pasarselo como parametro al hash
		const salt = bcrypt.genSalt(12);

		//salt es el numero de saltos, siempre será 12
		const hashedPassword = await bcrypt.hash(password, salt);

		//almacenamos en la db la password encriptada
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		//la quita de la respuesta, json hace esto (pero la contraseña si se almacenó en la base de datos!)
		newUser.password = undefined;

		// 201 -> Success and a resource has been created
		res.status(201).json({
			status: "success",
			data: { newUser },
		});
	} catch (error) {
		console.log(error);
	}
};

const login = async (req, res, next) => {
	// Get email and password from req.body
	const { email, password } = req.body;

	// Validate if the user exist with given email
	const user = await User.findOne({
		where: { email, status: "active" },
	});

	// Compare passwords (entered password vs db password)
	// If user doesn't exists or passwords doesn't match, send error
	if (!user || !(await bcrypt.compare(password, user.password))) {
		//primero evaluamos si consiguió el user, esto nos asegura que tenga un campo password porque si comparamos el password primero, puede ser el caso que nos ingresen un user que no exista
		return next(new AppError("Wrong credentials", 400));
	}

	// Remove password from response
	user.password = undefined;

	// Generate JWT (payload, secretOrPrivateKey, options)
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	res.status(200).json({
		status: "success",
		data: { user, token },
	});
};

const updateUser = async (req, res) => {
	try {
		const { name, email } = req.body;
		const { user } = req;

		// Method 1: Update by using the model
		// await User.update({ name }, { where: { id } });

		// Method 2: Update using a model's instance
		await user.update({ name, email });

		res.status(200).json({
			status: "success",
			data: { user },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { user } = req;

		// Method 1: Delete by using the model
		// User.destroy({ where: { id } })

		// Method 2: Delete by using the model's instance
		// await user.destroy();

		// Method 3: Soft delete
		await user.update({ status: "deleted" });

		res.status(204).json({ status: "success" });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllOrders,
	getOrderById,
	createUser,
	updateUser,
	deleteUser,
	login,
};
