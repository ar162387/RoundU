import React, { useState, useEffect } from "react";
import { View, Text, Image, Switch, StyleSheet, Animated } from "react-native";

const ItemComponent = ({ itemName, imageUrl, price, available, onToggle }) => {
    const [isAvailable, setIsAvailable] = useState(available);
    const fadeAnim = useState(new Animated.Value(available ? 1 : 0.5))[0]; // Ensure value syncs

    // Sync animation when availability changes
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: isAvailable ? 1 : 0.5,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isAvailable]);

    // Handle toggle switch
    const handleToggle = () => {
        setIsAvailable((prev) => !prev); // Toggle local state
        onToggle(); // Call parent function to update global state
    };

    return (
        <Animated.View style={[styles.itemContainer, { opacity: fadeAnim }]}>
            <Image source={{ uri: imageUrl }} style={styles.itemImage} />
            <Text style={styles.itemPrice}>Rs. {price}</Text>
            <Text style={styles.itemName} numberOfLines={2} ellipsizeMode="tail">{itemName}</Text>
            <Switch
                value={isAvailable}
                onValueChange={handleToggle}
                trackColor={{ false: "#FF4D4D", true: "#00C853" }}
                thumbColor="white"
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: 150,
        height: 220,
        backgroundColor: "#F1F3F6",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        marginRight: 12,
    },
    itemImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#020517",
        marginTop: 6,
    },
    itemName: {
        fontSize: 13,
        color: "#4C5066",
        textAlign: "center",
        maxWidth: 140,
        lineHeight: 16,
        marginTop: 4,
    },
});

export default ItemComponent;
