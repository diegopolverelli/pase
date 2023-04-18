import { Router } from "express";
import usuariosController from "../controllers/usuarios.controller.js";

const router=Router()

router.get('/',usuariosController.getUsuarios)
router.post('/',usuariosController.creaUsuario)

export default router