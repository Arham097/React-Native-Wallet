import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { styles } from "../assets/styles/home.styles";
import IonIcons from "react-native-vector-icons/Ionicons.js";
import { COLORS } from "../constants/color";
const NoTransactionFound = () => {
  const router = useRouter();
  return (
    <View style={styles.emptyState}>
      <IonIcons
        name="receipt-outline"
        size={50}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>No Transactions Yet</Text>
      <Text style={styles.emptyStateText}>
        Start tracking your finances by adding your first transaction.
      </Text>
      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => router.push("/create")}
      >
        <IonIcons name="add-circle" size={18} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoTransactionFound;
