import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/button';
import Icon from 'react-native-vector-icons/Entypo'; // Import the desired icon set
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import axios from "axios"; // Import Axios
import Constants from "expo-constants";


const API_BASE_URL = Constants.expoConfig?.extra?.API_URL

const OnboardingScreen = ({ navigation, route }) => {
    const { name, email, password } = route.params;
    const [selectedAccountType, setSelectedAccountType] = useState(null);

    useEffect(() => {
        console.log("Received data in OnboardingScreen:", { name, email, password });
    }, []);

    const handleAccountSelection = (type) => {
        setSelectedAccountType(type);
    };

    const handleDonePress = async () => {
        if (!selectedAccountType) {
            return Alert.alert("Error", "Please select an account type to continue.");
        }

        if (!name || !email || !password) {
            return Alert.alert("Error", "Signup data is missing. Please go back and enter details.");
        }

        const payload = {
            name: name.trim(),
            email: email.trim(),
            password: password,
            phone: "1234567890",
            role: selectedAccountType.toLowerCase(),
        };

        console.log("Sending signup request with payload:", payload);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, payload, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("Signup successful:", response.data);
            Alert.alert("Success", "Signup successful!");

            if (selectedAccountType === "Business") {
                navigation.replace("BusinessDashboard", { user: response.data });
            } else {
                navigation.replace("UserHome", { user: response.data });
            }
        } catch (error) {
            console.error("Signup error:", error?.response?.data || error.message);
            Alert.alert("Signup Failed", error?.response?.data?.message || "Something went wrong.");
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select Your Account Type</Text>
            <Text style={styles.subHeading}>
                If you're looking to sell something or provide services, select Business; otherwise, select User.
            </Text>

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[styles.checkbox, selectedAccountType === "User" && { borderColor: "#1733E3" }]}
                    onPress={() => handleAccountSelection("User")}
                >
                    <Text style={styles.checkboxText}>User</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.checkbox, selectedAccountType === "Business" && { borderColor: "#1733E3" }]}
                    onPress={() => handleAccountSelection("Business")}
                >
                    <Text style={styles.checkboxText}>Business</Text>
                </TouchableOpacity>
            </View>

            <Button title="Done" onPress={handleDonePress} height={50} width="100%" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    heading: {
        fontSize: 30,
        color: '#020517',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15, // Small spacing between heading and subheading
        paddingTop: 30
    },
    subHeading: {
        fontSize: 16,
        color: '#4C5066',
        textAlign: 'center',
        marginBottom: 40, // Wide spacing between subheading and first item
    },
    checkboxContainer: {
        alignItems: 'center', // Center items horizontally
        marginBottom: 60, // Wide spacing between second item and button
    },
    checkbox: {
        width: '100%', // Consistent width for checkboxes
        borderWidth: 2,
        borderColor: '#4C5066',
        borderRadius: 8,
        // alignItems: 'center',
        justifyContent: 'start',
        padding: 15,
        marginBottom: 15, // Wide spacing between items
    },
    iconTextContainer: {
        flexDirection: 'row', // Align icon and text horizontally
        alignItems: 'center',
        marginLeft: 15
    },
    icon: {
        marginRight: 15, // Space between icon and text
    },
    checkboxText: {
        fontSize: 16,
        color: '#020517',
    },
});

export default OnboardingScreen;
