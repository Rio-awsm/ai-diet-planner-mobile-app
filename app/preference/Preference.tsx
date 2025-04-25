import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Preference = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Tell us about yourself</Text>
      <Text style={styles.subtitle}>
        This helps us create your personalized diet plans.
      </Text>

      <View style={styles.rowContainer}>
        <View style={{ flex: 1 }}>
          <Input placeholder={"eg. 5.10"} label="Height (feet)" />
        </View>
        <View style={{ flex: 1 }}>
          <Input placeholder={"eg. 70"} label="Weight (Kg)" />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Gender</Text>
        <View style={styles.rowContainer}>
          <View style={[styles.genderOption]}>
            <Ionicons name="male" size={24} color="#007AFF" />
            <Text>Male</Text>
          </View>

          <View style={[styles.genderOption]}>
            <Ionicons name="female" size={24} color="#FF2D55" />
            <Text>Female</Text>
          </View>

          <View style={[styles.genderOption]}>
            <Ionicons name="person" size={24} color="#5856D6" />
            <Text>Other</Text>
          </View>
        </View>
      </View>

      <Input placeholder={"eg. 30"} label="Age (years)" />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>What's your Goal?</Text>
        <View>
          <View style={[styles.goalContainer]}>
            <View style={styles.goalHeader}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={24}
                color="#FF9500"
              />
              <Text style={styles.goalText}>Weight Loss</Text>
            </View>
            <Text style={styles.goalSubText}>Reduce body fat & get leaner</Text>
          </View>

          <View style={[styles.goalContainer]}>
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
          </View>

          <View style={[styles.goalContainer]}>
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
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Continue" />
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
