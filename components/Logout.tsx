import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React,{useState} from 'react'
// import styles from '@/assets/styles/create.styles'
import COLORS from '@/constants/constants'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '@/store/authStore'

const LogOut = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {logout} = useAuthStore() as any


    const confirmLogout = () => {
        Alert.alert("Are you sure?", "You want to logout", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "OK",
                style: "destructive",
                onPress: () => logout(),
            },
        ])
    }
  return (
    <TouchableOpacity onPress={confirmLogout} disabled={isLoading}>
              {
                isLoading ? (
                  <ActivityIndicator size={25} color={COLORS.white} />
                ) : (
                  <>
                    <Ionicons name="log-out-outline"  size={24} color={COLORS.white} />
                    <Text >logout</Text>
                  </>
                )
              }
            </TouchableOpacity>
  )
}

export default LogOut