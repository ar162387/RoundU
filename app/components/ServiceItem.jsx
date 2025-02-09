import React, { useState, useEffect } from "react";
import { View, Text, Image, Switch, StyleSheet, Animated } from "react-native";

const ServiceItem = ({ serviceName, imageUrl, price, isActive, onToggle }) => {
    const [isEnabled, setIsEnabled] = useState(isActive);
    const fadeAnim = useState(new Animated.Value(isActive ? 1 : 0.5))[0]; // Fade effect

    // Sync animation when availability changes
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: isEnabled ? 1 : 0.5,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isEnabled]);

    // Handle toggle switch
    const handleToggle = () => {
        setIsEnabled((prev) => !prev); // Toggle local state
        onToggle(); // Call parent function to update global state
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.price}>Rs. {price}</Text>
            <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{serviceName}</Text>
            <Switch
                value={isEnabled}
                onValueChange={handleToggle}
                trackColor={{ false: "#FF4D4D", true: "#00C853" }} // Red-Green transition
                thumbColor="white"
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 220,
        backgroundColor: "#F1F3F6",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        marginRight: 12,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#020517",
        marginTop: 6,
    },
    name: {
        fontSize: 13,
        color: "#4C5066",
        textAlign: "center",
        maxWidth: 140,
        lineHeight: 16,
        marginTop: 4,
    },
});

export default ServiceItem;
