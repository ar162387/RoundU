import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from "react-native";

const CategoryItem = ({ categoryName, imageUrl, itemCount = 0, onSelect, isSelected }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current; // Default scale is 1

    useEffect(() => {
        if (isSelected) {
            Animated.spring(scaleAnim, {
                toValue: 1.1, // Slightly bigger when selected
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scaleAnim, {
                toValue: 1, // Reverts back
                useNativeDriver: true,
            }).start();
        }
    }, [isSelected]);

    return (
        <TouchableOpacity onPress={onSelect} activeOpacity={0.7}>
            <Animated.View style={[styles.categoryContainer, isSelected && styles.selectedCategory, { transform: [{ scale: scaleAnim }] }]}>
                <Image source={{ uri: imageUrl }} style={styles.categoryImage} />
                <Text style={styles.categoryName} numberOfLines={2} ellipsizeMode="tail">{categoryName}</Text>
                <Text style={styles.itemCount}>{itemCount} items</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        width: 100,
        height: 160,
        backgroundColor: "#F1F3F6",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        marginRight: 12,
        borderWidth: 2,
        borderColor: "transparent",
    },
    selectedCategory: {
        borderColor: "#1733E3",
        backgroundColor: "#DCE6FF",
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 6,
    },
    categoryName: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#020517",
        textAlign: "center",
        maxWidth: 90, // Ensures text doesn't expand beyond the box
        lineHeight: 16, // Adjusts spacing for better readability
    },
    itemCount: {
        fontSize: 12,
        color: "#4C5066",
        textAlign: "center",
        marginTop: 2,
    },
});

export default CategoryItem;
