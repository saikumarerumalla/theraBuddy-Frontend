import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '@/screens/main/HomeScreen';
import { ChatScreen } from '@/screens/main/ChatScreen';
import { MoodScreen } from '@/screens/main/MoodScreen';
import { ExercisesScreen } from '@/screens/main/ExercisesScreen';
import { ProfileScreen } from '@/screens/main/ProfileScreen';
import { colors } from '@constants/colors';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Chat':
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              break;
            case 'Mood':
              iconName = focused ? 'happy' : 'happy-outline';
              break;
            case 'Exercises':
              iconName = focused ? 'fitness' : 'fitness-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.secondary,
        headerShown: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'ホーム' }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: 'チャット' }}
      />
      <Tab.Screen
        name="Mood"
        component={MoodScreen}
        options={{ title: '気分記録' }}
      />
      <Tab.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={{ title: 'エクササイズ' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'プロフィール' }}
      />
    </Tab.Navigator>
  );
};
