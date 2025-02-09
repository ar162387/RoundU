import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox'; // Correct import
import Button from '../components/button';
import InputField from '../components/inputfield';


const SignUpPage = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleSignUp = () => {
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);


        navigation.navigate("Select Account", { name, email, password });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Get Started For Free</Text>
            <Text style={styles.subHeading}>
                Your all-in-one solution to rent items, buy products, or book your services seamlessly and efficiently.
            </Text>
            <InputField label="Name" value={name} onChangeText={(text) => setName(text)} />
            <InputField label="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <InputField label="Password" value={password} onChangeText={(text) => setPassword(text)} isPassword={true} />

            <View style={styles.checkBoxContainer}>
                <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setIsChecked}
                    color={isChecked ? "#1733E3" : undefined}
                />
                <Text style={styles.checkBoxText}>
                    Creating an account means you're okay with our{" "}
                    <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                    <Text style={styles.linkText}>Privacy Policy</Text>.
                </Text>
            </View>

            <Button
                title="Sign Up"
                onPress={handleSignUp}
                height={50}
                width="100%"
                disabled={!isChecked} // Ensure checkbox is checked before signing up
            />

            <View style={styles.footer}>
                <Text>Already have an account? </Text>
                <Text style={styles.signInText} onPress={() => navigation.navigate("Login")}>
                    Sign In
                </Text>
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
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkBox: {
        marginRight: 8,
        width: 18,
        height: 18,
    },
    checkBoxText: {
        color: '#4C5066',
        flex: 1,
        lineHeight: 20,
        marginLeft: 3
    },
    linkText: {
        color: '#1733E3',
        textDecorationLine: 'underline',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signInText: {
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

export default SignUpPage;
