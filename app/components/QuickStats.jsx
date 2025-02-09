import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AnimatedNumber = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1000; // 1 second animation
        const increment = Math.ceil(value / (duration / 16)); // Approx. 60fps

        const interval = setInterval(() => {
            start += increment;
            if (start >= value) {
                clearInterval(interval);
                setDisplayValue(value);
            } else {
                setDisplayValue(start);
            }
        }, 16);

        return () => clearInterval(interval);
    }, [value]);

    return <Text style={styles.number}>{displayValue}</Text>;
};

const QuickStats = () => (
    <View style={styles.container}>
        <View style={styles.stat}>
            <Entypo name="shop" size={24} color="#1733E3" />
            <Text style={styles.label}>Shops</Text>
            <AnimatedNumber value={5} />
        </View>
        <View style={styles.stat}>
            <MaterialIcons name="local-shipping" size={24} color="#1733E3" />
            <Text style={styles.label}>Orders</Text>
            <AnimatedNumber value={300} />
        </View>
        <View style={styles.stat}>
            <MaterialIcons name="request-quote" size={24} color="#1733E3" />
            <Text style={styles.label}>Earnings</Text>
            <AnimatedNumber value={10000} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 3, // Adding border thickness
        borderColor: '#1733E3', // Primary color for the border
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        width: '98%',
        marginTop: 10,
        marginHorizontal: 2


    },

    stat: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#4C5066',
        marginTop: 2,
    },
    number: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#020517',
        marginTop: 5,
    },
});

export default QuickStats;
