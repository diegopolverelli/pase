import { Router } from "express";
import juguetesController from "../controllers/juguetes.controller.js";

const router=Router()

router.get('/',juguetesController.getJuguetes)
router.post('/',juguetesController.creaJuguete)

export default router