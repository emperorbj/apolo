import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Authlayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  )
}

export default Authlayout