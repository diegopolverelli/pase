import { Router } from "express";
import negociosController from "../controllers/negocios.controller.js";

export const router=Router();

router.get('/',negociosController.getNegocios)
router.post('/',negociosController.createNegocio)