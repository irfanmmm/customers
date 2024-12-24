import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomeTabBar from './src/components/CustomeTabBar';
import BillingScreen from './src/screens/BillingScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'red'},
      }}
      tabBar={props => <CustomeTabBar {...props} />}>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="BillPayment" component={BillingScreen} />
      <Tabs.Screen name="Profile" component={Home} />
    </Tabs.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: 'transparent'},
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="ErrorScreen" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
