import React, { useState } from "react";
import { View, Text, TextInput, Switch, Button, FlatList } from "react-native";

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [workoutGoal, setWorkoutGoal] = useState("");
  const [weight, setWeight] = useState("");

  const leaderboardData = [
    { id: "1", name: "Alex", workouts: 20 },
    { id: "2", name: "Jordan", workouts: 15 },
    { id: "3", name: "Taylor", workouts: 10 },
  ];

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: isDarkMode ? "#333" : "#fff" }}>
      {/* Dark Mode Toggle */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
      </View>

      {/* Workout Goal Input */}
      <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Workout Goal</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, color: isDarkMode ? "#fff" : "#000" }}
        placeholder="E.g., Run 10 miles this week"
        placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
        value={workoutGoal}
        onChangeText={setWorkoutGoal}
      />

      {/* Weight Input */}
      <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Weight (lbs)</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, color: isDarkMode ? "#fff" : "#000" }}
        placeholder="Enter your weight"
        placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      {/* Leaderboard */}
      <Text style={{ color: isDarkMode ? "#fff" : "#000", fontSize: 18, marginBottom: 10 }}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>{item.name}: {item.workouts} workouts</Text>
        )}
      />
    </View>
  );
};

export default ProfileScreen;
