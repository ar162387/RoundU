import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from './dashboardscreen';

import React from 'react';




const Stack = createStackNavigator();

const DashboardStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="DashboardHome" component={DashboardScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
};

export default DashboardStack;