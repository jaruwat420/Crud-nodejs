import express from "express";
import bodyParser from "body-parser";
import carRoutes from "./routes/car.routes.js";
import ejs  from "ejs";

const app = express();

// Static file
app.use(express.static("public"));
app.set('view engine', 'ejs');

// setting 
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route
app.use(carRoutes);

export default app;
