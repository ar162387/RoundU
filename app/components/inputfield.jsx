// Reusable Input Field Component
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText, isPassword = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHidden, setIsHidden] = useState(isPassword);

    return (
        <View style={styles.container}>
            <Text
                style={[
                    styles.label,
                    isFocused || value ? styles.labelFocused : null,
                ]}
            >
                {label}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    { borderColor: isFocused ? styles.primaryColor : styles.secondaryColor },
                ]}
                secureTextEntry={isHidden}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={value} // 🔥 Now receives value from parent
                onChangeText={onChangeText} // 🔥 Updates parent state
                autoCapitalize="none"
            />
            {isPassword && (
                <Text
                    style={styles.togglePassword}
                    onPress={() => setIsHidden(!isHidden)}
                >
                    {isHidden ? "Show" : "Hide"}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        position: 'absolute',
        top: 16,
        left: 8,
        color: '#4C5066',
        fontSize: 14,
    },
    labelFocused: {
        top: 2,
        left: 8,
        fontSize: 12,
        textDecorationLine: 'underline',
        color: '#020517',
        marginBottom: 10
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 8,
        paddingTop: 15,
        fontSize: 16,
        color: '#020517',
    },
    togglePassword: {
        position: 'absolute',
        right: 8,
        top: 16,
        color: '#1733E3',
        fontSize: 14,
    },
    primaryColor: '#1733E3',
    secondaryColor: '#020517',
});

export default InputField;
