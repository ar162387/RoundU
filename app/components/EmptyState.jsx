import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from './button';

const EmptyState = ({ onCreateShop }) => (
    <View style={styles.container}>
        <Image
            source={require('../assets/notask.png')} // Replace with the actual path to your Google logo
            style={styles.emptylogo}
        />
        <Text style={styles.title}>You dont have any shops yet.</Text>
        <Button title="Create Your First Shop" onPress={onCreateShop} height={50} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 16,
        color: '#4C5066',
        marginBottom: 20,
        textAlign: 'center',
    },
    emptylogo: {
        width: 200,
        height: 200,

    }
});

export default EmptyState;
