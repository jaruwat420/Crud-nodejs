import { Router } from "express";
import {
    renderCar,
    deleteCar,
    createCar,
    editCar,
    updateCar,
} from "../controllers/carController.js";
const router = Router();

// router.get("/" , (req, res) => {
//     res.render("index.ejs");
// });
router.get("/" , renderCar);
router.post("/create" , createCar);
router.get("/delete/:id" , deleteCar);
router.get("/update/:id" , editCar);
router.post("/update/:id" , updateCar);

export default router;