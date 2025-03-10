import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const stretches = [
  { id: '1', name: 'Hamstring Stretch', description: 'Stretches the hamstrings and lower back, improving flexibility and reducing tightness.' },
  { id: '2', name: 'Quadriceps Stretch', description: 'Targets the front of the thigh, improving knee and hip mobility.' },
  { id: '3', name: 'Calf Stretch', description: 'Loosens up the calves and Achilles tendon, reducing the risk of injury.' },
  { id: '4', name: 'Hip Flexor Stretch', description: 'Relieves tension in the hip flexors, especially for those who sit for long periods.' },
  { id: '5', name: 'Shoulder Stretch', description: 'Enhances shoulder mobility and helps alleviate upper body stiffness.' },
  { id: '6', name: 'Chest Stretch', description: 'Opens up the chest and improves posture, counteracting the effects of hunching forward.' },
  { id: '7', name: 'Triceps Stretch', description: 'Increases flexibility in the arms and shoulders, aiding in upper-body movements.' },
  { id: '8', name: 'Neck Stretch', description: 'Reduces tension in the neck and shoulders, helpful for those with desk jobs.' },
  { id: '9', name: 'Seated Spinal Twist', description: 'Improves spinal mobility and relieves tension in the back.' },
  { id: '10', name: 'Butterfly Stretch', description: 'Targets the inner thighs and hips, improving lower-body flexibility.' },
];

const StretchingScreen = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Importance of Stretching</Text>
      <Text style={styles.subtitle}>
        Stretching improves flexibility, reduces muscle stiffness, and enhances overall mobility. It can also prevent injuries and improve posture.
      </Text>
      <FlatList
        data={stretches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stretchItem}
            onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <Text style={styles.stretchName}>{item.name}</Text>
            {expandedId === item.id && <Text style={styles.description}>{item.description}</Text>}
          </TouchableOpacity>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  stretchItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
  },
  stretchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#aaa',
  },
});

export default StretchingScreen;
