// Reusable Button Component
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({ title, onPress, height = 50, width = '100%', disabled = false }) => {
    return (
        <LinearGradient
            colors={disabled ? ['#C0C0C5', '#C0C0C5'] : ['#1733E3', '#4FB6FD']}
            style={[styles.gradientButton, { height, width }]}
        >
            <TouchableOpacity
                style={[styles.touchable, { height, width }]}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={0.2}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientButton: {
        borderRadius: 25,
        overflow: 'hidden', // Ensures gradient respects borderRadius
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, // Ensures TouchableOpacity covers the full area
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Button;
