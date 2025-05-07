import { User } from './../types/data';
import {create} from "zustand"
import api from "@/api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage"


export const useAuthStore = create((set)=>({
    user:null,
    token:null,
    error:null,
    loading:false,
    signup:async(formData:User)=>{
        set({loading:true,error:null})
        try {
            const response = await api.post("/api/auth/signup",formData)
            if(!response.data){
                throw new Error("sign up failed on the server")
            }

            await AsyncStorage.setItem("authToken",response?.data?.token)
            await AsyncStorage.setItem("authUser",JSON.stringify(response.data.user))

            set({user:response.data.user,token:response.data.token,loading:false})
            return {success:true}
        } catch (error:any) {
            const errorMsg = error.response?.data?.message || 'sign up failed'
            set({ error: errorMsg, loading: false });
            return { success: false, error: errorMsg };
        }
    },
    login:async(formData:User)=>  {
        set({loading:true,error:null})
        try {
            const response = await api.post('/api/auth/login',formData)
            if(!response.data){
                throw new Error('login failed bad response from api')
            }

            await AsyncStorage.setItem("authToken",response.data.token)
            await AsyncStorage.setItem("authUser",JSON.stringify(response.data.user))


            set({user:response.data.user,token:response.data.token,loading:false})

            return {success:true}
        } catch (error:any) {
            const errorMsg = error.response?.data?.message || 'failed to login'
            set({ error: errorMsg, loading: false });
            return { success: false, error: errorMsg };
        }
    },    

    checkAuth:async()=>{
        try {
            const authtoken = await AsyncStorage.getItem("authToken")
            const authUser = await AsyncStorage.getItem("authUser")
            if(authUser && authtoken){
                const user = JSON.parse(authUser)
                set({token:authtoken,user:user})
                return { user, token: authtoken };
            }
            return { user: null, token: null }; 
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
    },

    logout:async()=>{
        await AsyncStorage.removeItem("authToken")
        await AsyncStorage.removeItem("authUser")
        set({user:null,token:null})
    }
}))