import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

import LottieView from 'lottie-react-native';
const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView
          source={require('@/assets/load.json')}
          autoPlay
          loop={true}
          style={{ width: 200, height: 150 }}
        />
      </View>
  )
}

export default Loader