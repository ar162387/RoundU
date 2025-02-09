import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const RequestsScreen = () => (
    <View style={styles.screenContainer}>
        <Text style={styles.screenText}>Requests</Text>
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


export default RequestsScreen;