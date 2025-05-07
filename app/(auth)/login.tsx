import {
    View, Text, TextInput,
    TouchableOpacity, ActivityIndicator,
    KeyboardAvoidingView, Platform, Alert, StyleSheet, Modal
} from 'react-native'
import React, { useState } from 'react'
import styles from '@/styles/login.styles'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/constants'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuthStore } from '@/store/authStore'
import { LoginProps, PopUp } from '@/types/data'
import LottieView from 'lottie-react-native';




export default function Login() {
    const { loading, error, login, user } = useAuthStore() as LoginProps
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<PopUp>({ title: '', message: '', success: false });


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (name: string, value: string) => {
        setFormData({
            ...formData, [name]: value
        })
    }


    const [showPassword, setShowPassword] = useState(false);




    const handleLogin = async () => {
        const results = await login(formData);
        if (!results.success) {
            setModalContent({
                title: "Login Failed",
                message: results.error,
                success: false
            });
            setModalVisible(true);
        }
        if (results.success) {
            console.log(user);
            
            setModalContent({
                title: "Login Successful",
                message: `Welcome buddy😊`,
                success: true
            });
            setModalVisible(true);
        }
    };




    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <LinearGradient colors={["#26282C", "#35373B"]} style={styles.container}>
                <View>
                    {/* top illustration */}
                    <View style={styles.topIllustration}>

                    </View>

                    {/* card for the form*/}
                    <View style={styles.card}>
                        <View style={styles.formContainer}>
                            {/* email */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="mail-outline" size={20}
                                        style={styles.inputIcon}
                                        color={COLORS.primary} />
                                    <TextInput value={formData.email}
                                        style={styles.input}
                                        keyboardType='email-address'
                                        placeholderTextColor={COLORS.placeholderText}
                                        placeholder="Email"
                                        onChangeText={(text) => handleChange('email', text)}
                                    />
                                </View>
                            </View>

                            {/* password */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="lock-closed" size={20}
                                        style={styles.inputIcon}
                                        color={COLORS.primary} />
                                    <TextInput value={formData.password}
                                        style={styles.input}
                                        secureTextEntry={!showPassword}
                                        placeholderTextColor={COLORS.placeholderText}
                                        placeholder="password"
                                        onChangeText={(text) => handleChange('password', text)}
                                    />

                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setShowPassword(!showPassword)}>
                                        <Ionicons name={showPassword ? "eye-off" : "eye"}
                                            size={20}
                                            style={styles.inputIcon}
                                            color={COLORS.primary} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                {
                                    loading ? (
                                        <ActivityIndicator size={20} color={COLORS.white} />
                                    ) : (
                                        <Text style={styles.buttonText}>Login</Text>
                                    )
                                }
                            </TouchableOpacity>

                            {/* footer */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Don't have an account?</Text>
                                <Link href={"/signup"} asChild>
                                    <TouchableOpacity>
                                        <Text style={styles.link}>Signup</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >


                <View style={popupStyles.centeredView}>
                    <View style={popupStyles.modalView}>


                        {
                            modalContent.success ? (
                                <LottieView
                                    source={require('@/assets/success.json')}
                                    autoPlay
                                    loop={true}
                                    style={{ width: 200, height: 100 }}
                                />
                            ) : (
                                <LottieView
                                    source={require('@/assets/error.json')}
                                    autoPlay
                                    loop={true}
                                    style={{ width: 200, height: 100 }}
                                />
                            )
                        }

                        <Text style={popupStyles.modalText}>{modalContent.message}</Text>

                        {
                            modalContent.success ?(
                                <View>

                                </View>
                            ):(<TouchableOpacity
                            style={[popupStyles.button, { backgroundColor: COLORS.primary }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={popupStyles.buttonText}>OK</Text>
                        </TouchableOpacity>
                        )
                        }
                    </View>

                </View>

            </Modal>

        </KeyboardAvoidingView>


    )
}

const popupStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%"
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#666',
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        width: "70%"
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
