import { View, Text, TouchableOpacity,StyleSheet,
   ActivityIndicator, Alert, } from 'react-native'
import React,{useState} from 'react'
// import styles from '@/assets/styles/create.styles'
import COLORS from '@/constants/constants'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '@/store/authStore'

interface activeProps {
  isVisible: boolean,
  setIsVisible:(value:boolean)=> void
}



const LogOut = ({isVisible,setIsVisible}:activeProps) => {
    const [isLoading, setIsLoading] = useState(false)
   
    const {logout} = useAuthStore() as any


    const confirmLogout = () => {
        setIsVisible(true)
    }
  return (
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={confirmLogout} disabled={isLoading}>
              {
                isLoading ? (
                  <ActivityIndicator size={25} color={COLORS.primary} />
                ) : (
                  <>
                    <Ionicons name="log-out-outline"  size={24} color={COLORS.primary} />
                    <Text style={{fontSize:18,fontWeight:'semibold',color:COLORS.primary}}>logout</Text>
                  </>
                )
              }
            </TouchableOpacity>
            </View>
  )
}

export default LogOut

const styles = StyleSheet.create({
    button: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:20,
        borderRadius: 10,
        borderWidth:2,
        borderColor:COLORS.primary,
        padding:10,
        width:'50%'
        
    },
    buttonContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    }
})