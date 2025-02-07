import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import {TransitionPresets} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './src/components/CustomTabBar';
import BillingScreen from './src/screens/BillingScreen';
import ReportScreen from './src/screens/ReportScreen';
import Profile from './src/screens/Profile';
import Error from './src/screens/Error';
import {AlertProvider} from './src/components/CustomeAlert/CustomeAlert';
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export const ProductContext = createContext(null);

const BottomTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'red'},
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="BillPayment" component={BillingScreen} />
      <Tabs.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
    </Tabs.Navigator>
  );
};
const App = () => {
  const [currenProducts, setCurrenProducts] = useState(null);
  const [currentTab, setCurrentTab] = useState({
    type: null,
    route: null,
  });

  const [clareData, setClareData] = useState(true);
  return (
    <ProductContext.Provider
      value={{
        currenProducts,
        setCurrenProducts,
        currentTab,
        setCurrentTab,
        clareData,
        setClareData,
      }}>
      <AlertProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {backgroundColor: 'transparent'},
              animationTypeForReplace: 'pop',
              ...TransitionPresets.ScaleFromCenterAndroid,
            }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={BottomTabs} />
            <Stack.Screen name="ErrorScreen" component={Error} />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertProvider>
    </ProductContext.Provider>
  );
};

export default App;
