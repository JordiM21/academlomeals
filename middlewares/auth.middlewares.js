const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { User } = require("../models/user.model");

dotenv.config({ path: "./config.env" });

const protectSession = async (req, res, next) => {
	try {
		let token;
		if (
			//validamos si en los headers esta el token correcto
			req.headers.authorization &&
			req.headers.authorization.startsWidth("Bearer")
		) {
			//separo la palabra bearer del token por el espacio y tomo el 2do elemento del array
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) {
			//entramos al segundo if y revisamos si hay token o no
			return res.status(403).json({
				status: "error",
				message: "invalid session",
			});
		}
		//regresa el token decodificado y verifica si el token YA EXPIRO
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findOne({
			where: { id: decoded.id, status: "active" },
		});

		if (!user) {
			return res.status(403).json({
				status: "error",
				message: "the user is no longe active",
			});
		}

		req.sessionUser = user;

		next();
	} catch (error) {
		console.log(error);
	}
};

const protectUsersAccount = async (req, res, next) => {
	const { sessionUser, user } = req;

	if (sessionUser.id !== user.id) {
		return res.status(403).json({
			status: "error",
			message: "you are not the owner of this account",
		});
	}

	next();
	//grant access
};

const userIsAdmin = async (req, res, next) => {
	const { sessionUser } = req;

	if (sessionUser.role == "admin") {
		return res.status(403).json({
			status: "error",
			message: "you are not the owner of this account",
		});
	}

	next();
	//grant access
};

module.exports = { protectSession, protectUsersAccount, userIsAdmin };
