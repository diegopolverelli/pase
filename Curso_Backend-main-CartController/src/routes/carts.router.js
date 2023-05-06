import { Router } from "express";
import cartManager from "../controllers/cartManager.js";

const router = Router();

//Llamar al controlador de MongoDB
// import cartManagerDB from "../controllers/cartManagerDB.js";
// const cart = new cartManagerDB

const cart=new cartManager()


// Llamar al controlador de FileSystem 
// import cartManager from "../controllers/cartManagerFS.js";
// const cart = new cartManager("./src/cart.json")

router.get('/', cart.getCarts)

router.get("/:cid", cart.getCartById)

router.post("/", cart.addCart)

router.post("/:cid/products/:pid", cart.addProductToCart)

// router.put('/:cid', cart.updateCart)

// router.put('/:cid/products/:pid', cart.updateProductFromCart)

router.delete("/:cid", cart.deleteCart)

// router.delete("/:cid/products/:pid", cart.deleteProductInCart)

export default router;