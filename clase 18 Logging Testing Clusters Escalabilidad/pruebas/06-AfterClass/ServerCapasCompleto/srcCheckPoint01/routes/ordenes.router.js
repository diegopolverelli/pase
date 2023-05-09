import { Router } from "express";
import ordenesController from "../controllers/ordenes.controller.js";

export const router=Router();

router.get('/',ordenesController.getOrdenes)
router.post('/',ordenesController.createOrden)