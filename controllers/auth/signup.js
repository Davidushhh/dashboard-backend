const bcrypt = require("bcryptjs");
const { pool } = require("../../models/connection");

const signup = async (req, res, next) => {
  const {
    login,
    email = null,
    password,
    structureName,
    surname,
    firstName,
    lastName,
    phone = null,
    position = "user",
    access = null,
    district = null,
    hromada = null,
  } = req.body;

  const user = `SELECT login FROM dep_users WHERE login = '${login}'`;

  try {
    pool.query(user, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      if (result && result.length) {
        return res.status(409).json({
          code: 409,
          message: "Login in use",
        });
      }

      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const newUserQuery =
        "INSERT INTO dep_users (login, email, password, structureName, surname, firstName, lastName, phone, position, access, district, hromada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      pool.query(
        newUserQuery,
        [
          login,
          email,
          hashPassword,
          structureName,
          surname,
          firstName,
          lastName,
          phone,
          position,
          access,
          district,
          hromada,
        ],
        (err, result) => {
          if (err) {
            return res.status(404).json({
              message: err.message,
              code: 404,
            });
          }
          return res.status(201).json({
            message: "user created",
            code: 201,
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signup };
