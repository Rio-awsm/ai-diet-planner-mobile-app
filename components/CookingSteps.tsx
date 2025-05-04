import Colors from "@/constants/Colors";
import {
    Feather,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Animated,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const CookingSteps = ({ recipeDetail }: any) => {
  const steps = recipeDetail?.jsonData?.steps;

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const progressAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (steps?.length) {
      const progress = completedSteps.length / steps.length;
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [completedSteps, steps]);

  if (!steps || !steps.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noStepsText}>No cooking steps available</Text>
      </View>
    );
  }

  const toggleStepCompletion = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((i) => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const renderStep = ({ item, index }: { item: any; index: number }) => {
    const isCompleted = completedSteps.includes(index);

    return (
      <TouchableOpacity
        style={[
          styles.stepContainer,
          isCompleted && styles.completedStepContainer,
        ]}
        activeOpacity={0.7}
        onPress={() => toggleStepCompletion(index)}
      >
        <View
          style={[
            styles.stepNumberContainer,
            isCompleted && styles.completedStepNumberContainer,
          ]}
        >
          {isCompleted ? (
            <Feather name="check" size={16} color="#fff" />
          ) : (
            <Text style={styles.stepNumber}>{index + 1}</Text>
          )}
        </View>
        <View style={styles.stepContent}>
          <Text
            style={[styles.stepText, isCompleted && styles.completedStepText]}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const estimatedTime = recipeDetail?.jsonData?.cookingTime || "30 mins";
  const difficulty = recipeDetail?.jsonData?.difficulty || "Medium";

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIconContainer}>
          <FontAwesome5 name="utensils" size={16} color="#fff" />
        </View>
        <Text style={styles.headerText}>Preparation Steps</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={18}
            color={Colors.PRIMARY}
          />
          <Text style={styles.infoText}>{estimatedTime}</Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="chef-hat"
            size={18}
            color={Colors.PRIMARY}
          />
          <Text style={styles.infoText}>{difficulty}</Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={18}
            color={Colors.PRIMARY}
          />
          <Text style={styles.infoText}>{steps.length} steps</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {completedSteps.length} of {steps.length} steps completed
        </Text>
      </View>

      <FlatList
        data={steps}
        renderItem={renderStep}
        keyExtractor={(_, index) => `step-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.stepSeparator} />}
      />

      <View style={styles.tipCard}>
        <View style={styles.tipIconContainer}>
          <MaterialCommunityIcons
            name="lightbulb-outline"
            size={20}
            color="#fff"
          />
        </View>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Tip for you</Text>
          <Text style={styles.tipText}>
            Prepare everything first and then start cooking to avoid rush.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CookingSteps;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
    marginLeft: 6,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: "#777",
    textAlign: "right",
  },
  listContainer: {
    paddingVertical: 8,
  },
  stepContainer: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.PRIMARY,
  },
  completedStepContainer: {
    backgroundColor: "#f0f7f0",
    borderLeftColor: "#4CAF50",
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    marginTop: 2,
  },
  completedStepNumberContainer: {
    backgroundColor: "#4CAF50",
  },
  stepNumber: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  stepContent: {
    flex: 1,
    paddingVertical: 2,
  },
  stepText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  completedStepText: {
    color: "#777",
    textDecorationLine: "line-through",
  },
  stepSeparator: {
    height: 16,
  },
  noStepsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    padding: 20,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#eee",
  },
  tipIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFA000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#444",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
