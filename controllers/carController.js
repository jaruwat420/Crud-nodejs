import { pool } from "../db.js";

export const renderCar = async (req, res) => {

    const [rows] = await pool.query("SELECT * FROM car_data");
    console.log(rows);
    res.render("index.ejs", {car_data: rows });
};

export const createCar = async (req, res) => {
    const carData = {
        car_license: req.body["car_license"],
        car_type: req.body["car_type"],
        car_brand: req.body["car_brand"],
        car_model: req.body["car_model"],
        car_color: req.body["car_color"],
        car_year: req.body["car_year"],
        car_gear: req.body["car_gear"],
        car_province: req.body["car_province"]
    };

    console.log(carData);
    // Check if any required fields are empty
    const requiredFields = ["car_license", "car_type", "car_brand", "car_model", "car_color", "car_year","car_gear", "car_province"];
    const emptyFields = requiredFields.filter(field => !carData[field]);

    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: `Required fields are empty: ${emptyFields.join(", ")}`
        });
    }

    try {
        await pool.query("INSERT INTO car_data SET ?", [carData]);
        res.redirect("/");
    } catch (error) {
        console.error("Error inserting car data:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const editCar = async (req, res) => {
    const {
        id
    } = req.params;
    const [result] = await pool.query("SELECT * FROM car_data WHERE id = ?", [
        id,
    ]);
    res.render("cars_edit", {
        car: result[0]
    });
};

export const updateCar = async (req, res) => {
    const {
        id
    } = req.params;
    const newcar = req.body;
    await pool.query("UPDATE car_data set ? WHERE id = ?", [newcar, id]);
    res.redirect("/");
};

export const deleteCar = async (req, res) => {
    const {
        id
    } = req.params;
    const result = await pool.query("DELETE FROM car_data WHERE id = ?", [id]);
    if (result.affectedRows === 1) {
        res.json({
            message: "Customer deleted"
        });
    }
    res.redirect("/");
};