import { Router } from "express";
import multer from "multer";
import transactionController from "../controllers/transaction.controller";

const upload = multer({ storage: multer.memoryStorage() }); // saving file in memory => wont save at disk

const transactionRouter = Router();

transactionRouter.post(
  "/upload",
  upload.single("file"),
  transactionController.create
);

export default transactionRouter;
