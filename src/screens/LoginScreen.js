import React, { Fragment, useState, useEffect } from 'react'
import {
  Platform, StatusBar,
  StyleSheet, KeyboardAvoidingView,
  Text, ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  View
} from 'react-native'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Login } from '../store/actions'
import Toast from '../components/Toast'

const LoginScreen = ({ }) => {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [typeTost, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowToast(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [showToast])

  const submit = () => {
    setWaiting(true)
    axios
      .post('https://data.halalguide.me/api/manager/auth/', { login: username, password: password })
      .then(response => {
        const data = response.data
        dispatch(Login(data))
        console.log(response.data);
        setWaiting(false)
      })
      .catch(error => {
        console.log(error)
        setTypeToast('warning')
        setMessageToast('Некорректные учетные данные.')
        setShowToast(true)
        setWaiting(false)
      })
  }
  return (
    <>
      <Fragment>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#282a2d' }}>
          <StatusBar backgroundColor="#242629" barStyle="dark-content" />
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'position' : null}>
              {/*logo*/}
              <View style={{ marginBottom: 50, marginLeft: 30, justifyContent: 'center' }}>
                <Text style={{
                  fontFamily: 'Roboto-Light',
                  color: '#fbe73d',
                  fontSize: 48
                }}>HalalEda</Text>
                <Text style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#fff',
                  fontSize: 48,
                }}>Delivery</Text>
              </View>
              <View style={{ marginBottom: 50 }}>
                <TextInput style={styles.login}
                  autoFocus
                  placeholder={"login"}
                  maxLength={20}
                  placeholderTextColor={'#fff'}
                  onChangeText={login => { setUsername(login) }}
                  autoCapitalize="none"
                  autoCorrect={false}>
                </TextInput>
                <TextInput style={styles.login}
                  autoCapitalize="none"
                  placeholder={'password'}
                  placeholderTextColor={'#fff'}
                  onChangeText={password => { setPassword(password) }}
                  secureTextEntry={true}>
                </TextInput>
              </View>
              {/*enter batton*/}
              {waiting ?
                <ActivityIndicator size="small" />
                :
                <TouchableOpacity onPress={() => submit()} style={styles.button}>
                  <Text style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 18,
                    color: '#282a2d'
                  }}>{"signin"}</Text>
                </TouchableOpacity>
              }
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
        <Toast type={typeTost} show={showToast} message={messageToast} />

      </Fragment>

    </>
  )
}

const styles = StyleSheet.create({
  login: {
    fontFamily: 'Roboto-Regular',
    fontSize: 26,
    marginVertical: 20,
    color: '#fff',
    borderColor: '#696e75',
    borderBottomWidth: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    paddingVertical: 20,
    backgroundColor: '#fbe73d',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LoginScreen
