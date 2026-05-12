import { Router } from "express";
import { ProductsController } from "../controllers/productsController";

const router = Router();
const productController = new ProductsController();

router.get("/products", productController.get);
router.post("/products", productController.create);
router.patch("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);

export const productRouter = router;
