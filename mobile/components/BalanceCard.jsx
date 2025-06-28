import { View, Text } from "react-native";
import React from "react";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/color";

const BalanceCard = ({ summary }) => {
  // Safely parse values and provide defaults
  const balance = isNaN(parseFloat(summary?.balance))
    ? 0
    : parseFloat(summary.balance);
  const income = isNaN(parseFloat(summary?.income))
    ? 0
    : parseFloat(summary.income);
  const expenses = isNaN(parseFloat(summary?.expenses))
    ? 0
    : parseFloat(summary.expenses);

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>TotalBalance</Text>
      <Text style={styles.balanceAmount}>Rs. {balance.toFixed(2)}</Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +Rs. {income.toFixed(2)}
          </Text>
        </View>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            Rs. {Math.abs(expenses).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
