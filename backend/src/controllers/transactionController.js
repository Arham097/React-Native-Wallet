import { sql } from "../config/db.js";

export const getTransactionById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }
    const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC;
        `;
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || !category || amount === undefined) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const transation = await sql`
    INSERT INTO transactions (user_id, title, amount, category)
    VALUES(${user_id}, ${title}, ${amount}, ${category})
    RETURNING *;
    `;

    console.log("Transaction created:", transation);
    return res.status(201).json(transation[0]);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Transaction ID is required." });
    }
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid Transaction ID." });
    }
    const result = await sql`
    DELETE FROM transactions WHERE id =  ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    return res
      .status(204)
      .json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getTransactionSummary = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }
  console.log("Fetching summary for user:", userId);
  const summary = await sql`
      SELECT COALESCE(SUM(amount), 0) AS balance,
      COALESCE(SUM(amount) FILTER (WHERE amount <0), 0) AS expenses,
      COALESCE(SUM(amount) FILTER (WHERE amount> 0),0) AS income
      FROM transactions WHERE user_id = ${userId}`;

  if (summary.length === 0) {
    return res
      .status(404)
      .json({ error: "No transactions found for this user." });
  }

  return res.status(200).json(summary[0]);
};
