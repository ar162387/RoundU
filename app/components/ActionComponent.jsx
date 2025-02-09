import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as IconSet from '@expo/vector-icons'; // Dynamic icon import

const ActionComponent = ({
    title,
    onPress,
    height = 50,
    width = '100%',
    disabled = false,
    iconLibrary = 'FontAwesome5', // Default icon library
    iconName,
    iconSize = 18,
    iconColor = "white",
    roundCorners = 12, // Soft rounded corners
    gradientColors = ['#1733E3', '#4FB6FD'], // Default gradient colors
}) => {
    const IconComponent = IconSet[iconLibrary] || IconSet.FontAwesome5; // Dynamically select the library

    return (
        <LinearGradient
            colors={disabled ? ['#C0C0C5', '#C0C0C5'] : gradientColors}
            style={[styles.gradientButton, { height, width, borderRadius: roundCorners }]}
        >
            <TouchableOpacity
                style={[styles.touchable, { height, width, borderRadius: roundCorners }]}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={0.6}
            >
                {/* Dynamically render the icon */}
                {iconName && <IconComponent name={iconName} size={iconSize} color={iconColor} style={styles.icon} />}
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientButton: {
        overflow: 'hidden', // Ensures gradient respects borderRadius
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        flexDirection: 'row', // Aligns icon & text horizontally
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, // Ensures TouchableOpacity covers the full area
    },
    icon: {
        marginRight: 8, // Adds spacing between icon & text
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ActionComponent;
