import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionSummary,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/summary/:userId", getTransactionSummary);

router.get("/:userId", getTransactionById);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

export default router;
