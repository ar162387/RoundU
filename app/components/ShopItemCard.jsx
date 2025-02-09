import React from 'react';
import { View, Text, Image, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ShopItemCard = ({ shop, onToggle, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: shop.image }} style={styles.thumbnail} />
        <View style={styles.info}>
            <Text style={styles.name}>{shop.name}</Text>
            <Text style={styles.details}>Orders: {shop.orders}</Text>
            <Text style={styles.details}>Earnings: ${shop.earnings}</Text>
            <Text style={styles.details}>Type: {shop.type}</Text>
        </View>
        <View style={styles.actions}>
            <Icon
                name={shop.isActive ? "store" : "store-slash"}
                size={20}
                color={shop.isActive ? "#30D158" : "#FF453A"}
            />
            <Switch
                value={shop.isActive}
                onValueChange={onToggle}
                trackColor={{ false: "#FF453A", true: "#30D158" }}
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16, // Add horizontal margin for spacing between cards
        backgroundColor: '#FFF',
        borderRadius: 12, // Rounded corners
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8, // Soft shadow effect
        shadowOffset: { width: 0, height: 4 }, // Subtle drop shadow
        elevation: 5, // Elevation for Android
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#020517',
        marginBottom: 5,
    },
    details: {
        fontSize: 13,
        color: '#4C5066',
    },
    actions: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ShopItemCard;
