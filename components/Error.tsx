import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
const Error = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View>
      <LottieView
        source={require('@/assets/not.json')}
        autoPlay
        loop={true}
        style={{ width: 200, height: 150 }}
      />
      <Text>Something went wrong...</Text>
    </View>
  </View>
  )
}

export default Error