import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import carRoutes from "./routes/car.routes.js";
import util from "util";


const app = express();
const port = 3000;

// Static file
app.use(express.static("public"));

// setting 
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route
app.use(carRoutes);

export default app;
