import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {Init} from './src/store/actions';
import {store} from './src/store';
import Login from './src/screens/Login';
import HomeOne from './src/screens/HomeOne';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ScanScreen from './src/screens/ScanScreen';
import HomeMain from './src/screens/HomeMain';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const token = useSelector(state => state.Reducers.authToken);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const init = async () => {
    await dispatch(Init());
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#35a83a" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Toast />
      <StatusBar backgroundColor="#1e2e34" barStyle="light-content" />
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
      <Stack.Screen name="MainScreen" component={HomeMain} />
      <Stack.Screen
        getId={({params}) => (params?.userId, params?.username, params?.date)}
        name="HomeScreen"
        component={HomeOne}></Stack.Screen>
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
      <Stack.Screen
        getId={({params}) => params?.orderId}
        name="HistoryScreen"
        component={HistoryScreen}
      />
      <Stack.Screen
        getId={({params}) => params?.orderId}
        name="SettingsScreen"
        component={SettingsScreen}
      />
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
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
};
export default App;
