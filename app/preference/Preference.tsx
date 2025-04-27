import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Colors from "@/constants/Colors";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { calculateNutritionNeeds } from "@/lib/CalorieCalculate";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Preference = () => {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const { user, setUser } = useContext(UserContext) as any;
  const router = useRouter();

  const UpdateUserPreference = useMutation(api.User.UpdateUserPreference);

  const OnContinue = async () => {
    if (!weight || !height || !age || !gender) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    const data = {
      uid: user?._id,
      weight: weight,
      height: height,
      gender: gender,
      age: age,
      goal: goal,
    };

    //calculate calories
    const nutritionResult = calculateNutritionNeeds(data)
    const response = nutritionResult

    const result = await UpdateUserPreference({
      ...data,
      ...response,
    });
    setUser((prev: any) => ({
      ...prev,
      ...data,
    }));
    router.replace("/(tabs)/Home")
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Tell us about yourself</Text>
      <Text style={styles.subtitle}>
        This helps us create your personalized diet plans.
      </Text>

      <View style={styles.rowContainer}>
        <View style={{ flex: 1 }}>
          <Input
            placeholder={"eg. 5.10"}
            label="Height (feet)"
            onChangeText={setHeight}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            placeholder={"eg. 70"}
            label="Weight (Kg)"
            onChangeText={setWeight}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Gender</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => setGender("Male")}
            style={[
              styles.genderOption,
              gender === "Male" && styles.selectedOption,
            ]}
          >
            <Ionicons name="male" size={24} color="#007AFF" />
            <Text>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender("Female")}
            style={[
              styles.genderOption,
              gender === "Female" && styles.selectedOption,
            ]}
          >
            <Ionicons name="female" size={24} color="#FF2D55" />
            <Text>Female</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender("Other")}
            style={[
              styles.genderOption,
              gender === "Other" && styles.selectedOption,
            ]}
          >
            <Ionicons name="person" size={24} color="#5856D6" />
            <Text>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Input placeholder={"eg. 30"} label="Age (years)" onChangeText={setAge} />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>What's your Goal?</Text>
        <View>
          <TouchableOpacity
            style={[
              styles.goalContainer,
              goal === "Weight Loss" && styles.selectedOption,
            ]}
            onPress={() => setGoal("Weight Loss")}
          >
            <View style={styles.goalHeader}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={24}
                color="#FF9500"
              />
              <Text style={styles.goalText}>Weight Loss</Text>
            </View>
            <Text style={styles.goalSubText}>Reduce body fat & get leaner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.goalContainer,
              goal === "Muscle Gain" && styles.selectedOption,
            ]}
            onPress={() => setGoal("Muscle Gain")}
          >
            <View style={styles.goalHeader}>
              <MaterialCommunityIcons
                name="arm-flex"
                size={24}
                color="#5856D6"
              />
              <Text style={styles.goalText}>Muscle Gain</Text>
            </View>
            <Text style={styles.goalSubText}>
              Build strength & increase muscle mass
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.goalContainer,
              goal === "Weight Gain" && styles.selectedOption,
            ]}
            onPress={() => setGoal("Weight Gain")}
          >
            <View style={styles.goalHeader}>
              <MaterialCommunityIcons
                name="food-apple"
                size={24}
                color="#4CD964"
              />
              <Text style={styles.goalText}>Weight Gain</Text>
            </View>
            <Text style={styles.goalSubText}>
              Increase overall body weight healthily
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Continue" onPress={OnContinue} />
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default Preference;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.GRAY,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  sectionContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  genderOption: {
    borderColor: Colors.GRAY,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  goalContainer: {
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    padding: 15,
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
  goalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  goalSubText: {
    color: Colors.GRAY,
    marginLeft: 34,
  },
  selectedOption: {
    borderColor: "#007AFF",
    borderWidth: 2,
    backgroundColor: "rgba(0, 122, 255, 0.05)",
  },
});
