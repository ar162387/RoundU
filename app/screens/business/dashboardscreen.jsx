import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ShopItemCard from '../../components/ShopItemCard';
import QuickStats from '../../components/QuickStats';
import EmptyState from '../../components/EmptyState';
import Button from '../../components/button';

const DashboardScreen = ({ navigation }) => {
    const [shops, setShops] = useState([
        {
            id: '1',
            name: 'Shop A',
            image: 'https://via.placeholder.com/50',
            orders: 150,
            earnings: 1200,
            isActive: true,
            type: 'rental',
        },
        {
            id: '2',
            name: 'Shop B',
            image: 'https://via.placeholder.com/50',
            orders: 80,
            earnings: 950,
            isActive: false,
            type: 'food',
        },
    ]);

    const toggleShopStatus = (id) => {
        setShops((prevShops) =>
            prevShops.map((shop) =>
                shop.id === id ? { ...shop, isActive: !shop.isActive } : shop
            )
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <FontAwesome5 name="bars" size={24} color="#020517" />
                </TouchableOpacity>
                <Text style={styles.title}>Dashboard</Text>
                <Button
                    title="Add Shop"
                    onPress={() => navigation.navigate('CreateShopForm')}
                    height={40}
                    width={100}
                />
            </View>
            <QuickStats />
            {shops.length > 0 ? (
                <FlatList
                    data={shops}
                    renderItem={({ item }) => (
                        <ShopItemCard
                            shop={item}
                            onToggle={() => toggleShopStatus(item.id)}
                            onPress={() =>
                                navigation.navigate('ShopScreen', {
                                    shopId: item.id,
                                })
                            }
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <EmptyState onCreateShop={() => navigation.navigate('CreateShopForm')} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#F8F9FA',
    },
    title: { fontSize: 20, fontWeight: 'bold', color: '#020517', marginRight: 90 },
});

export default DashboardScreen;
