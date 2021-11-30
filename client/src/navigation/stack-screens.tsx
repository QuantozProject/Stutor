import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {
  AppointmentScreen,
  CourseDetailScreen,
  CoursesScreen,
  HomeScreen,
  MyLessonsScreen,
  ProfileScreen,
} from '@/screens'

const StackNavigator = createNativeStackNavigator()

const HomeStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Home" component={HomeScreen} />
    </StackNavigator.Navigator>
  )
}

const CourseStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Courses" component={CoursesScreen} />
      <StackNavigator.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
      />
      <StackNavigator.Screen name="Appointment" component={AppointmentScreen} />
    </StackNavigator.Navigator>
  )
}

const MyLessonsStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="MyLessons" component={MyLessonsScreen} />
    </StackNavigator.Navigator>
  )
}

const ProfileStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Profile" component={ProfileScreen} />
    </StackNavigator.Navigator>
  )
}

export {
  HomeStackScreen,
  CourseStackScreen,
  MyLessonsStackScreen,
  ProfileStackScreen,
}
