import {response} from "express";
import {pool} from "../db.js";

// ShowData
export const renderCar = async (req, res) => {    
    const [rows] = await pool.query("SELECT * FROM car_data");
    res.render("index.ejs", {
        car_data: rows
    });
};

//Get DataTable
export const getdataTable = async(req, res) => {
    const [data] = await pool.query("SELECT * FROM car_data");
    res.json(data);
};

// CreateCar
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

    try {
        await pool.query("INSERT INTO car_data SET ?", [carData]);
        res.redirect("/");
    } catch (error) {
        console.error("Error inserting car data:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Update
export const updateCar = async (req, res) => {
    const newCar = req.body;
    const reqId = req.params.id;
    const {car_license, car_type, car_brand, car_model, car_color, car_year, car_gear, car_province} = newCar;

    const updateQuery = `
        UPDATE car_data 
        SET car_license = ?, 
            car_type = ?, 
            car_brand = ?, 
            car_model = ?, 
            car_color = ?, 
            car_year = ?, 
            car_gear = ?, 
            car_province = ? 
        WHERE car_id = ?`;

    try {
        const values = [car_license, car_type, car_brand, car_model, car_color, car_year, car_gear, car_province, reqId];
        await pool.query(updateQuery, values);
            res.status(200).json({ message: "อัพเดทข้อมูลสำเร็จ!" ,status: "200"});
        return;
    } catch (error) {
        res.status(404).json({ message: `${error}` });
        return;
    }
};

// Delete 
export const deleteCar = async (req, res) => {
    const {id} = req.params;
    const [result] = await pool.query("DELETE FROM car_data WHERE car_id = ?", [id]);
    // const resultStr = JSON.parse(JSON.stringify(result));

    if (result.affectedRows === 1) {        
        res.status(200).json({ message: "ลบข้อมูลสำเร็จ" });
        return;
    }
        res.status(404).json({ message: "เกิดข้อผิดพลาด!" });
        return;
};