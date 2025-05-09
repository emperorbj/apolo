import {
  Pressable, Text, TouchableOpacity, View, StyleSheet,
  FlatList, Dimensions, ScrollView
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import * as Location from "expo-location";
import { useState } from "react";

import COLORS from "@/constants/constants";
import { useRouter } from 'expo-router';
import ProfileMenu from "@/components/profileMenu";


export default function Profile() {




  const { user } = useAuthStore() as any
  return (
    <LinearGradient colors={["#FFFFFF", "#D3D3D3"]} style={styles.linear}>
      <View style={styles.profileCardContainer}>
        <View style={styles.profileImageCard}>
          <Image style={{ width: "100%", height: "100%", borderRadius: 50 }} source={{ uri: user?.imageURL }} contentFit="cover" />
        </View>
        <View style={{ width: "70%", height: "100%", padding: 10, justifyContent: "center" }}>
                <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 5,
          color:'#ffffff'
        }}>{user?.name}</Text> 
        <Text style={{fontSize: 16,color:'#333',fontWeight:'semibold' }}>{user?.email}</Text>
        </View>
      </View>

       <ProfileMenu/>
       
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linear: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    paddingHorizontal: 15,
    paddingTop: 60
  },
  profileCardContainer: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginVertical: 6,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    paddingLeft:20
  },
  profileImageCard: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

})