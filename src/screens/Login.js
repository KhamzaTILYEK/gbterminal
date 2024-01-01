import React, { Fragment, useState, } from 'react';
import { useKeyboard } from '@react-native-community/hooks'
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import {
  EmailIcon,
  PasswordIcon,
  LogoSvg,
  LogoBg,
} from '../assets/svg_icons/icons';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Login } from '../store/actions'
import Toast from 'react-native-toast-message';

const tr = {
  signin: 'Вход',
  password: 'Пароль',
  login: 'Войти',
  scan_qr_code: "Сканировать QR код",
  scan: "Сканировать",
  add_order_price: "Стоимость заказа",
  pay: "Оплатить",
  add_bonus: "Зачислить",
  or: "или",
  warning: "Внимание!",
  instruction: "Вводите всю сумму заказа, Количество баллов расчитывается автоматически",
  total_price: "Общий счет",
  cancel: "Отмена",
  place_qr_code: "Наведите телефон на QR-код",
  customer: "Пользователь",
  rescan: "Сканировать еще раз",
  bonus_added: "Бонусы зачиcлены",
  payed_with_bonus: "Оплачено бонусами",
  main: "Основное",
  lang: "Язык",
  quit: "Выйти",
  email: 'Электронная почта или Логин'
}
const App = () => {
  const keyboard = useKeyboard()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [waiting, setWaiting] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = () => {

    if (login && password) {
      setWaiting(true)
      axios
        .post('https://data.halalguide.me/api/office/auth/login/', { login: login, password: password })
        .then(response => {
          const data = response.data
          dispatch(Login(data))
          setWaiting(false)
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Некорректные учетные данные',
          });
          setWaiting(false)
        })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Введите учетные данные',
      });

    }
  }

  return (
    <Fragment>

      <SafeAreaView style={[{ flex: 1, backgroundColor: "#1e2e34" }, { marginTop: keyboard.keyboardShown && -keyboard.keyboardHeight / 2 }]}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}
          bounces={false}>
          <View style={styles.body}>
            <View style={styles.logoCont}>
              <LogoBg width={'100%'} height={"100%"} preserveAspectRatio="none"
                style={{ position: 'absolute', top: 0 }} fill={'#1e2e34'} />
              <LogoSvg width={'60%'} height={'100%'} />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.inputTitle}>{tr.signin}</Text>
              <View style={styles.inputStringCont}>
                <EmailIcon width={23} height={23} fill={"#fff"} style={styles.iconMargin} />
                <TextInput
                  placeholder={tr.email}
                  placeholderTextColor={'#a8afb1'}
                  style={styles.textInputStyle}
                  keyboardType={"email-address"}
                  autoCompleteType={'email'}
                  autoCapitalize="none"
                  onChangeText={email => setLogin(email)}
                  textContentType={"emailAddress"}
                />
              </View>
              <View style={styles.inputStringCont}>
                <PasswordIcon width={23} height={23} fill={"#fff"} style={styles.iconMargin} />
                <TextInput
                  placeholder={tr.password}
                  placeholderTextColor={'#a8afb1'}
                  style={styles.textInputStyle}
                  onChangeText={password => setPassword(password)}
                  secureTextEntry
                  autoCapitalize="none"
                  textContentType={'password'}
                />
              </View>
              <TouchableOpacity style={styles.buttonCont}
                onPress={() => onSubmit(login, password, waiting, setWaiting)}>

                {waiting ?
                  <ActivityIndicator size="small" /> :

                  <Text style={styles.buttonText}>{tr.login}</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "100%",
    backgroundColor: '#25363d',
    justifyContent: 'space-around',
    flexDirection: "column",
    alignItems: "center"
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#25363d'
  },
  logoCont: {
    width: '100%',
    aspectRatio: 1.09,
    alignItems: 'center',
    maxHeight: 700,
    maxWidth: 700
  },
  inputBlock: {
    marginTop: 10,
    aspectRatio: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    maxWidth: 400
  },
  inputTitle: {
    fontFamily: 'SFUIDisplay-Thin',
    fontSize: 30,
    color: '#fff',
  },
  inputStringCont: {
    marginTop: 6,
    flexDirection: 'row',
    borderBottomColor: '#515e64',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '85%',
  },
  textInputStyle: {
    flex: 1,
    height: 60,
    fontFamily: 'SFUIText-Regular',
    color: '#fff',
    fontSize: 17,
  },
  buttonCont: {
    width: '90%',
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffeb3b',
    marginTop: 27,
    marginBottom: 40,
  },
  buttonText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 19,
    color: '#273b4a',
  },
  iconMargin: {
    left: -11
  }
});

export default App;


