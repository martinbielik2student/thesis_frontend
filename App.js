/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Link,
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  Box,
  VStack,
  Code,
  extendTheme,
  FormControl,
  Input,
  Button,
} from 'native-base';
import NativeBaseIcon from './src/components/NativeBaseIcon';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from './src/screens/Details';
import ToDoList from './src/components/ToDoList';

const App = () => {
  const [token, setToken] = React.useState('');
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          {!token ? (
            <Stack.Screen name="Login" options={{headerShown: false}}>
              {props => <Login {...props} setToken={setToken} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Home" options={{headerShown: false}}>
                {props => <Home {...props} token={token} setToken={setToken} />}
              </Stack.Screen>
              <Stack.Screen name="Details" options={{headerShown: true}}>
                {props => (
                  <Details {...props} token={token} setToken={setToken} />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
