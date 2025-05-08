import Colors from "@/constants/Colors";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";

const TodayProgress = () => {
  const { user } = useContext(UserContext) as any;
  const convex = useConvex();
  const [totalConsumed, setTotalConsumed] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);

  const GetTotalCalories = async () => {
    if (!user?._id) return;

    try {
      const result = await convex.query(api.MealPlan.getTotalCaloriesConsumed, {
        date: moment().format("DD/MM/YYYY"),
        uid: user?._id,
      });
      setTotalConsumed(result || 0);
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    GetTotalCalories();

    const intervalId = setInterval(() => {
      GetTotalCalories();
    }, 1500);

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        GetTotalCalories();
      }
      setAppState(nextAppState);
    });

    return () => {
      clearInterval(intervalId);
      subscription.remove();
    };
  }, [user]);

  const calculateProgress = () => {
    if (!user?.calories || user.calories === 0) return 0;
    const percentage = (totalConsumed / user.calories) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  const getMotivationalMessage = () => {
    const progress = calculateProgress();
    if (progress === 0) return "Start your day right!";
    if (progress < 25) return "Good start!";
    if (progress < 50) return "You're doing great!";
    if (progress < 75) return "Keep it up! 🔥";
    if (progress < 100) return "Almost there!";
    return "Goal achieved! 🎉";
  };

  const progressPercentage = `${calculateProgress()}%`;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Today's Goal</Text>
        <Text style={styles.dateText}>{moment().format("MMM DD, yyyy")}</Text>
      </View>

      <Text style={styles.calorieCount}>
        {totalConsumed}/{user?.calories || 0} Kcal
      </Text>

      <Text style={styles.motivationalText}>{getMotivationalMessage()}</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: progressPercentage }]} />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Calories consumed</Text>
        <Text style={styles.footerText}>{getMotivationalMessage()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 18,
  },
  calorieCount: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 14,
    color: Colors.PRIMARY,
  },
  motivationalText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  progressBarContainer: {
    backgroundColor: Colors.GRAY,
    height: 10,
    borderRadius: 99,
    marginTop: 20,
    opacity: 0.7,
    overflow: "hidden",
  },
  progressBar: {
    backgroundColor: Colors.PRIMARY,
    height: 10,
    borderRadius: 99,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: Colors.GRAY || "#666",
  },
});

export default TodayProgress;
