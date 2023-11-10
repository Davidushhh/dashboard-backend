const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const chartsRouter = require("./routes/api/chartsRouter");
const tableRouter = require("./routes/api/tablesRouter");
const authRouter = require("./routes/api/authRouter");
const depCabinetRouter = require("./routes/api/depCabinetRouter");

const app = express();
const formatsLogger =
  app.get("env") === "development" ? "combined" : "combined";

//  create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), "access.log"),
  { flags: "a" }
);

app.use(logger(formatsLogger, { stream: accessLogStream }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/charts", chartsRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", depCabinetRouter);
app.use("/api/profile/tables", tableRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/...",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
