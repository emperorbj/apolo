import {
  Pressable, Text, TouchableOpacity,Modal, View, StyleSheet, Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useState } from "react";
import LottieView from 'lottie-react-native';
import COLORS from "@/constants/constants";
import { useRouter } from 'expo-router';
import ProfileMenu from "@/components/profileMenu";


export default function Profile() {
  const router = useRouter()
 const [isVisible,setIsVisible] = useState(false)


  const { user,logout } = useAuthStore() as any
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

       <ProfileMenu isVisible={isVisible} setIsVisible={setIsVisible}/>

      <Modal
  visible={isVisible}
      
  animationType="slide"
  onRequestClose={() => setIsVisible(false)}
>
  <View
    // style={{
    //   flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    
    // }}
    style={styles.modalOverlay}
  >
    <View
      // style={{
      //   width: '80%',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   padding: 20,
        
      // }}
      style={styles.modalContent}
    >
      <Text style={{ fontSize: 20, textAlign: 'center' }}>
        Do you really want to Logout😒?
      </Text>
      <LottieView
        source={require('@/assets/not.json')}
        autoPlay
        loop={true}
        style={{ width: 300, height: 250 }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%', // Adjust width for buttons
          marginTop: 20,
        }}
      >
        <TouchableOpacity onPress={()=>logout()}>
          <Text style={{ fontSize: 16, color: '#FFFFFF' ,borderWidth:1,
             borderColor:'#C70039',paddingHorizontal:40,paddingVertical:10,backgroundColor:'#C70039'
            ,shadowOffset:{width:0,height:2},shadowOpacity:0.3,shadowRadius:4,elevation:5,borderRadius:10}}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Text style={{ fontSize: 16, color: '#FFFFFF',borderWidth:1,
             borderColor:COLORS.primary,paddingHorizontal:40,paddingVertical:10,backgroundColor:COLORS.primary,
             shadowOffset:{width:0,height:2},shadowOpacity:0.3,shadowRadius:4,elevation:5,borderRadius:10}}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
       
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
    modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },

})