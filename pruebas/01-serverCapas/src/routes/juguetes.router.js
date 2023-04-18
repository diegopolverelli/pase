import { Router } from "express";
import juguetesController from "../controller/juguetes.controller.js";

export const router=Router()


router.get('/',juguetesController.getJuguetes)
router.post('/',juguetesController.grabaJuguete)