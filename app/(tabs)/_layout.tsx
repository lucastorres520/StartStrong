import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab'; // Ensure you have this component
import { IconSymbol } from '@/components/ui/IconSymbol'; // Ensure you have this component
import TabBarBackground from '@/components/ui/TabBarBackground'; // Ensure you have this component
import { Colors } from '@/constants/Colors'; // Ensure Colors is defined
import { useColorScheme } from '@/hooks/useColorScheme'; // Ensure useColorScheme is set up

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab, // Custom button for tabs
        tabBarBackground: TabBarBackground, // Custom background for tab bar
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // This makes the tab bar transparent on iOS
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, // Icon for Home
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />, // Icon for Explore
        }}
      />
    </Tabs>
  );
}
