import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Button, StyleSheet } from 'react-native';

const meals = [
  { 
    id: '1', 
    title: 'Grilled Chicken & Quinoa Bowl', 
    ingredients: ['Grilled chicken', 'Quinoa', 'Spinach', 'Cherry tomatoes', 'Olive oil', 'Lemon juice'], 
    benefits: 'High in protein and fiber, supports muscle recovery and digestion.' 
  },
  { 
    id: '2', 
    title: 'Salmon with Sweet Potatoes', 
    ingredients: ['Salmon fillet', 'Sweet potatoes', 'Broccoli', 'Garlic', 'Olive oil'], 
    benefits: 'Rich in omega-3s, great for heart health and energy.' 
  },
  { 
    id: '3', 
    title: 'Oatmeal & Banana Smoothie', 
    ingredients: ['Oats', 'Banana', 'Almond milk', 'Honey', 'Chia seeds'], 
    benefits: 'Boosts energy, provides sustained release of carbohydrates.' 
  },
  { 
    id: '4', 
    title: 'Turkey & Avocado Wrap', 
    ingredients: ['Whole wheat tortilla', 'Turkey slices', 'Avocado', 'Lettuce', 'Tomato', 'Mustard'], 
    benefits: 'Great source of lean protein and healthy fats for sustained energy.' 
  },
  { 
    id: '5', 
    title: 'Greek Yogurt & Berry Parfait', 
    ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey'], 
    benefits: 'Packed with probiotics, antioxidants, and protein for gut health and muscle recovery.' 
  },
];

const exercises = [
  { 
    id: '1', 
    name: 'Push-Ups', 
    instructions: 'Start in a plank position. Lower your body until your chest nearly touches the floor. Push back up to the starting position.', 
    benefits: 'Strengthens chest, shoulders, and triceps.' 
  },
  { 
    id: '2', 
    name: 'Squats', 
    instructions: 'Stand with feet shoulder-width apart. Lower your hips down and back as if sitting into a chair. Keep your knees over your toes. Stand back up.', 
    benefits: 'Builds leg strength and improves mobility.' 
  },
  { 
    id: '3', 
    name: 'Plank', 
    instructions: 'Hold a push-up position with your elbows on the ground. Keep your body in a straight line and hold for 30-60 seconds.', 
    benefits: 'Improves core strength and stability.' 
  },
  { 
    id: '4', 
    name: 'Lunges', 
    instructions: 'Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle. Push back up and switch legs.', 
    benefits: 'Strengthens legs and improves balance.' 
  },
  { 
    id: '5', 
    name: 'Bicycle Crunches', 
    instructions: 'Lie on your back, hands behind your head. Bring your right elbow to your left knee while straightening the right leg. Alternate sides.', 
    benefits: 'Engages core muscles and improves abdominal strength.' 
  },
];

const dashboardItems = [
  { id: '1', title: 'Popular Meals' },
  { id: '2', title: 'Popular Exercises' },
  { id: '3', title: 'Progress Tracker', content: 'Keep track of your fitness journey and milestones.' },
];

const DashboardScreen = ({ route }) => {
  const { username } = route.params; // Get the username from the route params
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // State for progress tracker
  const [currentExercise, setCurrentExercise] = useState('');
  const [currentReps, setCurrentReps] = useState('');
  const [currentDuration, setCurrentDuration] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [goal, setGoal] = useState('');
  const [weight, setWeight] = useState('');

  // Function to add a workout
  const addWorkout = () => {
    setWorkouts([
      ...workouts,
      {
        id: (workouts.length + 1).toString(),
        exercise: currentExercise,
        reps: currentReps,
        duration: currentDuration,
      },
    ]);
    setCurrentExercise('');
    setCurrentReps('');
    setCurrentDuration('');
  };

  // Function to handle goal input
  const handleGoalChange = (text: string) => setGoal(text);

  // Function to handle weight input
  const handleWeightChange = (text: string) => setWeight(text);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {username}</Text>
      <FlatList
        data={dashboardItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => setExpandedSection(expandedSection === item.id ? null : item.id)}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
            
            {/* Popular Meals Dropdown */}
            {expandedSection === '1' && item.id === '1' && (
              <View style={styles.dropdown}>
                {meals.map((meal) => (
                  <View key={meal.id} style={styles.item}>
                    <Text style={styles.itemTitle}>{meal.title}</Text>
                    <Text style={styles.itemSubtitle}>Ingredients:</Text>
                    <Text style={styles.itemText}>{meal.ingredients.join(', ')}</Text>
                    <Text style={styles.itemSubtitle}>Benefits:</Text>
                    <Text style={styles.itemText}>{meal.benefits}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Popular Exercises Dropdown */}
            {expandedSection === '2' && item.id === '2' && (
              <View style={styles.dropdown}>
                {exercises.map((exercise) => (
                  <View key={exercise.id} style={styles.item}>
                    <Text style={styles.itemTitle}>{exercise.name}</Text>
                    <Text style={styles.itemSubtitle}>Instructions:</Text>
                    <Text style={styles.itemText}>{exercise.instructions}</Text>
                    <Text style={styles.itemSubtitle}>Benefits:</Text>
                    <Text style={styles.itemText}>{exercise.benefits}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Progress Tracker Section */}
            {expandedSection === '3' && item.id === '3' && (
              <View style={styles.dropdown}>
                <Text style={styles.subtitle}>Log Your Workouts</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Exercise Name"
                  value={currentExercise}
                  onChangeText={setCurrentExercise}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Reps"
                  value={currentReps}
                  onChangeText={setCurrentReps}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Duration (mins)"
                  value={currentDuration}
                  onChangeText={setCurrentDuration}
                />
                <Button title="Add Workout" onPress={addWorkout} />

                {/* Display workout log */}
                <FlatList
                  data={workouts}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.workoutItem}>
                      <Text style={styles.workoutText}>{item.exercise}</Text>
                      <Text style={styles.workoutText}>Reps: {item.reps}</Text>
                      <Text style={styles.workoutText}>Duration: {item.duration} mins</Text>
                    </View>
                  )}
                />

                {/* Goal Tracker */}
                <Text style={styles.subtitle}>Set Your Goal</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Set a fitness goal"
                  value={goal}
                  onChangeText={handleGoalChange}
                />
                {goal && <Text style={styles.goalText}>Goal: {goal}</Text>}

                {/* Weight Tracker */}
                <Text style={styles.subtitle}>Track Your Weight</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your weight"
                  value={weight}
                  onChangeText={handleWeightChange}
                  keyboardType="numeric"
                />
                {weight && <Text style={styles.goalText}>Weight: {weight} lbs</Text>}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardContent: {
    marginTop: 5,
    fontSize: 14,
    color: '#aaa',
  },
  dropdown: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#242424',
    borderRadius: 8,
  },
  item: {
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#bbb',
    marginTop: 5,
  },
  itemText: {
    fontSize: 14,
    color: '#ccc',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#2a2a2a',
    color: '#fff',
  },
  workoutItem: {
    marginBottom: 10,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  workoutText: {
    fontSize: 14,
    color: '#fff',
  },
  goalText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});

export default DashboardScreen;
