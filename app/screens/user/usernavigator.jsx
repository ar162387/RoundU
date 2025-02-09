import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from './homescreen';
import UserChatScreen from './userchatscreen';
import UserOrdersScreen from './userorderscreen';
import UserRequestScreen from './userrequestscreen';






const Tab = createBottomTabNavigator();









const UserHomeScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#1733E3', // Primary color for active tab
                tabBarInactiveTintColor: '#4C5066',
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Home') {
                        return <Entypo name="shop" size={size} color={color} />;
                    } else if (route.name === 'Requests') {
                        return <AntDesign name="carryout" size={size} color={color} />;
                    } else if (route.name === 'Chats') {
                        return <Ionicons name="chatbubbles-outline" size={size} color={color} />;
                    } else if (route.name === 'Orders') {
                        return <MaterialIcons name="local-shipping" size={size} color={color} />;
                    }
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarStyle: {
                    paddingVertical: 5,
                    height: 60,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Requests" component={UserRequestScreen} />
            <Tab.Screen name="Chats" component={UserChatScreen} />
            <Tab.Screen name="Orders" component={UserOrdersScreen} />
        </Tab.Navigator>
    );
};



export default UserHomeScreen;
