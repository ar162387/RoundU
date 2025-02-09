import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    findNodeHandle
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Dropdown = ({ label, options, selectedValue, onValueChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0 });
    const containerRef = useRef();

    const handleSelect = (value) => {
        setShowOptions(false);
        onValueChange(value);
    };

    const measureDropdownPosition = () => {
        if (containerRef.current) {
            containerRef.current.measureInWindow((x, y, width) => {
                setDropdownPosition({ x, y, width });
            });
        }
    };

    return (
        <View
            style={styles.container}
            ref={containerRef}
            onLayout={measureDropdownPosition}
        >
            <TouchableOpacity
                style={[styles.input, { borderColor: isFocused ? '#1733E3' : '#020517' }]}
                onPress={() => {
                    measureDropdownPosition();
                    setShowOptions(!showOptions);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                activeOpacity={1}
            >
                <Text
                    style={[
                        styles.label,
                        (isFocused || selectedValue) && styles.labelFocused,
                    ]}
                >
                    {label}
                </Text>
                <Text style={styles.selectedText}>
                    {selectedValue || ''}
                </Text>
                <FontAwesome name="caret-down" size={16} color="#1733E3" style={styles.icon} />
            </TouchableOpacity>

            <Modal
                visible={showOptions}
                transparent
                onRequestClose={() => setShowOptions(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowOptions(false)}
                >
                    <View style={[
                        styles.dropdown,
                        {
                            top: dropdownPosition.y + 60, // Adjust based on your input height
                            left: dropdownPosition.x,
                            width: dropdownPosition.width
                        }
                    ]}>
                        <ScrollView
                            style={styles.dropdownScroll}
                            nestedScrollEnabled // For Android
                        >
                            {options.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.option}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        justifyContent: 'center',
        position: 'relative',
        color: '#020517',
    },
    label: {
        position: 'absolute',
        left: 10,
        color: '#4C5066',
        fontSize: 14,
    },
    labelFocused: {
        top: -1,
        fontSize: 12,
        textDecorationLine: 'underline',
        color: '#020517',
    },
    selectedText: {
        fontSize: 16,
        color: '#020517',
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    dropdown: {
        position: 'absolute',
        maxHeight: 150,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#4C5066',
        borderRadius: 8,
    },
    dropdownScroll: {
        flexGrow: 1,
    },
    option: {
        padding: 10,
    },
    optionText: {
        fontSize: 14,
        color: '#020517',
    },
});

export default Dropdown;