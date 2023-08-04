import { Router } from "express";
import productController from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/product/:name", productController.read);
productRouter.get("/products", productController.readAll);

export default productRouter;
