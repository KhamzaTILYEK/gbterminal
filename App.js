import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message'
import { Init } from './src/store/actions';
import { store } from './src/store';

import Login from './src/screens/Login'
import HomeOne from './src/screens/HomeOne';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const token = useSelector(state => state.Reducers.authToken);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#35a83a" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Toast />
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {token === null ? <AuthStack /> : <MyStack />}
    </NavigationContainer>
  );
};

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        getId={({ params }) => (params?.orderId)}
        name="HomeScreen">
        {props => <HomeOne {...props} />}
      </Stack.Screen>
      <Stack.Screen
        getId={({ params }) => (params?.orderId)}
        name="HistoryScreen">
        {props => <HistoryScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        getId={({ params }) => (params?.orderId)}
        name="SettingsScreen">
        {props => <SettingsScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <RootNavigation />
        
      </Provider>
    </GestureHandlerRootView>
  );
};
export default App;
