/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme, View} from 'react-native';
import Start from './pages/Start';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from './Colors';
import Home from './pages/Home';
import Login from './pages/Login';

export type RootStackParamList = {
  start: {};
  home: {};
  login: {};
};

export const Stack = createNativeStackNavigator<RootStackParamList>();



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,

  },
  text: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="start">
          <Stack.Screen name="start" component={Start} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer >
      <SafeAreaView/>
    </View>
  );
}

export default App;
