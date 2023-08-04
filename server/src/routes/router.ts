import { Router, Request, Response, NextFunction } from "express";
import productRouter from "./product.router";
import transactionRouter from "./transaction.router";

const router = Router();

router.use(productRouter);
router.use(transactionRouter);

router.use(
  "/*",
  (_request: Request, response: Response, _next: NextFunction) => {
    response.redirect("http://localhost:5173");
  }
);

export default router;
