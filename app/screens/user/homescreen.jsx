import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const HomeScreen = () => (
    <View style={styles.screenContainer}>
        <Text style={styles.screenText}>Home</Text>
    </View>
);


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    screenText: {
        fontSize: 18,
        color: '#020517',
        fontWeight: 'bold',
    },
});



export default HomeScreen;