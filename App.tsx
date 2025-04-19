/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import TabNavigator from './navigation/TabNavigator';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from './screens/NoInternetScreen';

// Enable screens for better performance
enableScreens();

// Create a dark theme for navigation
const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFFFFF',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#2C2C2C',
    notification: '#FF453A',
  },
};

function App(): React.JSX.Element {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      {!isConnected ? <NoInternetScreen /> : <TabNavigator />}
    </NavigationContainer>
  );
}

export default App;
