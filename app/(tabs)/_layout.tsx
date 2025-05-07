import {Ionicons} from "@expo/vector-icons"
import { Tabs } from 'expo-router'
import React from 'react'
import COLORS from '../../constants/constants'
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useSafeAreaInsets } from "react-native-safe-area-context"





export default function Tabslayout() {
  const insets = useSafeAreaInsets()
  
  return (
    <Tabs 
    screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:COLORS.primary,

      headerShadowVisible:false,
      tabBarStyle:{
        // backgroundColor:COLORS.cardBackground,
        // borderTopColor:COLORS.border,
        // borderTopWidth:1,
        // paddingTop:5,
        // height:60 + insets.bottom,
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.85)", 
        borderTopColor: "rgba(255, 255, 255, 0.2)", 
        borderTopWidth: 1,
        paddingTop: 5,
        height: 60 + insets.bottom,
        backdropFilter: "blur(10px)"

      }
    }}>

      <Tabs.Screen name="index" options={{
        title:"Home",
        tabBarIcon:({size})=>(<Ionicons name="home-outline" size={size} color={COLORS.primary}/>)
      }}/>

      <Tabs.Screen name="videos" options={{
        title:"Videos",
        tabBarIcon:({size})=>(<Ionicons name="logo-youtube" size={size} color={COLORS.primary}/>)
      }}/>

      <Tabs.Screen name="blogs" options={{
        title:"Blogs",
        tabBarIcon:({size})=>(<Ionicons name="book-outline" size={size} color={COLORS.primary}/>)
      }}/>

      <Tabs.Screen name="Profile" options={{
        title:"Profile",
        tabBarIcon:({size})=>(<Ionicons name="person-outline" size={size} color={COLORS.primary}/>)
      }}/>

    </Tabs>
  )
}