import { Router } from "express";
import {
    renderCar,
    getdataTable,
    deleteCar,
    createCar,
    updateCar,
} from "../controllers/carController.js";
const router = Router();

router.get("/" , renderCar);
router.get("/getdatatable" , getdataTable);
router.post("/create" , createCar);
router.put("/delete/:id" , deleteCar);
router.put("/update/:id" , updateCar);

export default router;