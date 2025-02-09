// MainNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/loginscreen';
import SignUpPage from './screens/signupscreen';
import OnboardingScreen from './screens/accountselection';
import BusinessDashboardScreen from './screens/business/businessnavigator'; // Your tab navigator
import UserHomeScreen from './screens/user/usernavigator';
import ServiceArea from './screens/business/ServiceArea';
import CreateShopForm from './screens/business/CreateShopForm';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashboardScreen from './screens/business/dashboardscreen';
import ShopScreen from './screens/business/ShopScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
            <Stack.Screen name="Select Account" component={OnboardingScreen} />

            {/* When you navigate to "BusinessDashboard", your tab navigation will be displayed */}
            <Stack.Screen name="BusinessDashboard" component={BusinessDashboardScreen} />

            <Stack.Screen name="UserHome" component={UserHomeScreen} />
            <Stack.Screen
                name="ServiceArea"
                component={ServiceArea}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateShopForm"
                component={CreateShopForm}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Create Shop',
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#020517',
                        textAlign: 'center',
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('DashboardHome')}>
                            <Ionicons
                                name="chevron-back-sharp"
                                size={24}
                                color="#1733E3"
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen name="DashboardHome" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ShopScreen" component={ShopScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Navigation;
