import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      dispatch({
        type: 'LOGIN',
        payload: token,
      })
    }
  }
}

export const Login = (data) => {
  return async dispatch => {
    if (data) {
      await AsyncStorage.setItem('token', `token ${data.token}`)
      dispatch({
        type: 'LOGIN',
        payload: `token ${data.token}`
      })
    }
  }
}



export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT'
    })
  }
}