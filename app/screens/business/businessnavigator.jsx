import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashboardStack from './DashboardStack';
import RequestsScreen from './requestscreen';
import ChatsScreen from './chatscreen';
import OrdersScreen from './orderscreen';

const Tab = createBottomTabNavigator();

const BusinessDashboardScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#1733E3',
                tabBarInactiveTintColor: '#4C5066',
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Dashboard') {
                        return <Icon name="dashboard" size={size} color={color} />;
                    } else if (route.name === 'Requests') {
                        return <MaterialCommunityIcons name="billboard" size={size} color={color} />;
                    } else if (route.name === 'Chats') {
                        return <Ionicons name="chatbubbles-outline" size={size} color={color} />;
                    } else if (route.name === 'Orders') {
                        return <Icon name="request-quote" size={size} color={color} />;
                    }
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    padding: 3,
                },
                tabBarStyle: {
                    paddingVertical: 5,
                    height: 60,
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardStack} />
            <Tab.Screen name="Requests" component={RequestsScreen} />
            <Tab.Screen name="Chats" component={ChatsScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
        </Tab.Navigator>
    );
};

export default BusinessDashboardScreen;
