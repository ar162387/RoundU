import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet } from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../components/inputfield";
import Button from "../components/button";

import Constants from "expo-constants";


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = Constants.expoConfig?.extra?.API_URL

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }



    setLoading(true);
    const payload = { email: email.trim(), password: password };

    console.log("Sending login request with payload:", payload); // Debug log

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, payload, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Login Successful:", response.data); // Debug log

      Alert.alert("Success", "Login successful!");
      setLoading(false);

      // Navigate to the correct dashboard based on user role
      if (response.data.role === "business") {
        navigation.replace("BusinessDashboard", { user: response.data });
      } else {
        navigation.replace("UserHome", { user: response.data });
      }

    } catch (error) {
      console.error("Login error:", error?.response?.data || error.message);
      Alert.alert("Login Failed", error?.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your All-in-One Solution</Text>
      <Text style={styles.subHeading}>
        Sign in to your ultimate marketplace for seamless bookings, connections, and more
      </Text>

      {/* Google Sign-In (Placeholder, Implement Later) */}
      <LinearGradient colors={["#1733E3", "#4FB6FD"]} style={styles.googleButtonGradient}>
        <TouchableOpacity style={styles.googleButton} onPress={() => { }} activeOpacity={0.2}>
          <Image source={require("../assets/google_logo.png")} style={styles.googleLogo} />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      {/* Email & Password Input */}
      <InputField label="Email" value={email} onChangeText={setEmail} />
      <InputField label="Password" isPassword={true} value={password} onChangeText={setPassword} />

      {/* Forgot Password */}
      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      {/* Sign In Button */}
      <Button title={loading ? "Signing In..." : "Sign In"} onPress={handleLogin} height={50} width="100%" disabled={loading} />

      {/* Sign Up Link */}
      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.appName}>Around You</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#020517',
    textAlign: 'center',
    top: -25,
  },
  subHeading: {
    fontSize: 16,
    color: '#4C5066',
    textAlign: 'center',
    marginBottom: 20,
    top: -5,
  },
  googleButtonGradient: {
    borderRadius: 8,
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
    color: 'white',

  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    top: -10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#4C5066',
  },
  orText: {
    marginHorizontal: 10,
    color: '#4C5066',
    fontSize: 14,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#1733E3',
    fontSize: 14,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#1733E3',
    fontWeight: 'bold',
  },
  appName: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    marginTop: 40,
    bottom: -40,
  },
});

export default LoginPage;
