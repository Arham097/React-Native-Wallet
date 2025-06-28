import { useCallback, useState } from "react";
import { Alert } from "react-native";
import API_URL from "../constants/api.js"; // Adjust the import path as necessary

export default useTransaction = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    if (!userId) {
      console.log("No userId provided, skipping transaction fetch");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched transactions:", data);
      // Ensure data is an array
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]); // Set empty array on error
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    if (!userId) {
      console.log("No userId provided, skipping summary fetch");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched summary:", data);
      // Ensure summary has proper default values
      setSummary({
        balance: data?.balance || 0,
        income: data?.income || 0,
        expenses: data?.expenses || 0,
      });
    } catch (error) {
      console.error("Error fetching summary:", error);
      // Set default values on error
      setSummary({
        balance: 0,
        income: 0,
        expenses: 0,
      });
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) {
      console.error("User ID is required to fetch transactions and summary.");
      return;
    }
    setLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTrasaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete transaction: ${response.status}`);
      }
      // Don't call loadData here since it's called in the component
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", "Failed to delete transaction");
      throw error; // Re-throw to let component handle it
    }
  };
  return {
    transactions,
    summary,
    loading,
    loadData,
    deleteTrasaction,
  };
};
