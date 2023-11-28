import React, { Fragment, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity, Dimensions
} from 'react-native';
import { useCodeScanner, useCameraPermission, Camera, useCameraDevice } from 'react-native-vision-camera';
import { LogoQROff } from '../assets/svg_icons/qr_off_icon.js';
import { LogoQROn } from '../assets/svg_icons/qr_on_icon.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toast from '../components/Toast.js';
import { ActivityIndicator } from 'react-native-paper';
import { HistoryIcon, SettingsIcon } from "../assets/svg_icons/icons.js"

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
  place_qr_code2: "Сканирование выполняется автоматически",
  customer: "Пользователь",
  rescan: "Сканировать еще раз",
  bonus_added: "Бонусы зачиcлены",
  payed_with_bonus: "Оплачено бонусами",
  main: "Основное",
  lang: "Язык",
  quit: "Выйти",
  email: 'Электронная почта',
  history: 'История'
}

const HomeOne = ({ navigation, props }) => {

  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()
  const token = useSelector(state => state.Reducers.authToken);
  const [userId, setUserId] = useState()
  const [userName, setUserName] = useState()
  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [typeTost, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowToast(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [showToast])

  useEffect(() => {
    if (hasPermission == false) {
      requestPermission()
    }
    console.log(hasPermission);
  }, [])

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],

    onCodeScanned: (codes) => {
      setIsLoading(true)
      if (JSON.parse(codes[0].value).name) {
        setUserName(`${JSON.parse(codes[0].value).name} ${JSON.parse(codes[0].value).surname}`)
        setUserId(JSON.parse(codes[0].value).id)
        setIsLoading(false)
      } else {
        setUserName(codes[0].value)
        console.log("dsfsfsdfsdf");
        axios.get(`https://data.halalguide.me/api/user/${codes[0].value}`, {
          headers: {
            Authorization: token
          }
        })
          .then(response => {
            setUserName(response.data.name)
            setUserId(response.data.id)
            console.log(response.data.id);
            setIsLoading(false)
            // setTypeToast('done')
            // setMessageToast('coneccted to test QR')
            // setShowToast(true)
          }).catch(error => {
            console.log(error);
            setIsLoading(false)
            setTypeToast('error')
            setMessageToast(`Ошибка`)
            setShowToast(true)
          })
      }

      setScanning(false)

    }
  })

  const addBonus = () => {
    setIsLoading(true)
    axios.post(`https://data.halalguide.me/api/bonus/points/`, { user: userId, amount: amount }, { headers: { Authorization: token } })
      .then(response => {
        setTypeToast('done')
        setMessageToast(`Бонусы списаны`)
        setShowToast(true)
        setIsLoading(false)
        setUserName()
      }).catch(error => {
        setTypeToast('error')
        setMessageToast(`Бонусы не списаны`)
        setShowToast(true)
        setUserName()
        setIsLoading(false)
      })
  }
  const getBonus = () => {
    setIsLoading(true)
    axios.post(`https://data.halalguide.me/api/bonus/points/debit/`, { user: userId, amount: amount }, { headers: { Authorization: token } })
      .then(response => {
        setIsLoading(false)
        setTypeToast('done')
        setMessageToast(`debit Бонусы списаны`)
        setShowToast(true)
        setUserName()
      }).catch(error => {
        console.log("error: ", error);
        setIsLoading(false)
        setTypeToast('error')
        setMessageToast(`debit Бонусы не списаны`)
        setShowToast(true)
        setUserName()
      })
  }
  const quit = () => {
    setScanning(false)
  }

  const iconSize = 1.5
  return (
    <Fragment>
      <Toast type={typeTost} show={showToast} message={messageToast} />
      <StatusBar backgroundColor="#1e2e34" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        {scanning ?
          <>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Camera
                style={{ width: "100%", height: "100%" }}
                device={device}

                isActive={true}
                {...props} codeScanner={codeScanner}
              >
              </Camera>
              <View style={{ position: "absolute", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "space-around" }}>
                {/* Logo */}
                <View style={{ borderRadius: 10 * iconSize, borderWidth: 2 * iconSize, borderColor: "#fff", padding: 4 * iconSize, flexDirection: "column" }}>
                  <View style={{ borderColor: "#fff", borderBottomWidth: 2 * iconSize, flexDirection: "row", }}>
                    <View style={{ borderColor: "#fff", borderWidth: 2 * iconSize, marginBottom: 3 * iconSize, borderRadius: 3 * iconSize, padding: 3 * iconSize }}></View>
                    <View style={{ borderWidth: iconSize, borderColor: "#fff", marginHorizontal: 2 * iconSize }}></View>
                    <View style={{ borderColor: "#fff", borderWidth: 2 * iconSize, marginBottom: 3 * iconSize, borderRadius: 3 * iconSize, padding: 3 * iconSize }}></View>
                  </View>
                  <View style={{ flexDirection: "row", }}>
                    <View style={{ borderColor: "#fff", borderWidth: 2 * iconSize, marginTop: 3 * iconSize, borderRadius: 3 * iconSize, padding: 3 * iconSize }}></View>
                    <View style={{ borderWidth: iconSize, borderColor: "#fff", marginHorizontal: 2 * iconSize }}></View>
                    <View style={{ borderColor: "#fff", borderWidth: 2 * iconSize, marginTop: 3 * iconSize, borderRadius: 3 * iconSize, padding: 3 * iconSize }}></View>
                  </View>
                </View>
                {/* Text1 */}
                <Text style={{ textAlign: "center", color: "#fff", fontSize: 26, fontWeight: 600, paddingHorizontal: 20 }}>
                  {tr.place_qr_code}
                </Text>
                {/* Box */}
                <View style={{ borderWidth: 2, borderColor: "#ffeb3b", borderRadius: 20, width: "100%", height: windowWidth - 30 }}></View>
                {/* Text2 */}
                <Text style={{ textAlign: "center", color: "#fff", fontSize: 18, fontWeight: 500 }}>
                  {tr.place_qr_code2}
                </Text>
                {/* Button  */}
                <View style={{ height: 42, width: "100%" }}>
                  <TouchableOpacity onPress={() => quit()} style={{ width: "100%", borderRadius: 15, borderWidth: 2, borderColor: "#fff", flex: 1, alignItems: "center", padding: 5, backgroundColor: "#ffffff33" }}>
                    <Text style={{ color: "#fff", fontWeight: 500, fontSize: 18, }}>{tr.cancel}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
          :
          <>
            <View style={{ backgroundColor: "#1e2e34", flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
              <View style={{ paddingLeft: 20, marginVertical: 10 }}>
                <TouchableOpacity>
                  <HistoryIcon onPress={() => navigation.navigate('HistoryScreen')} width={30} height={30} fill="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={{ color: "#FFF", fontWeight: 400, fontSize: 26, }}>GreenBonus</Text>
              <View style={{ paddingRight: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                  <SettingsIcon width={30} height={30} fill="#fff" />
                </TouchableOpacity>

              </View>
            </View>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={styles.scrollView}>
              <View style={styles.body}>
                <View style={styles.logoCont}>
                  {userName ?
                    <>
                      <LogoQROn width={'100%'} height={'100%'} preserveAspectRatio="none" style={{ position: 'absolute', top: 0 }} />
                      <Text style={styles.userTitleText}>{tr.customer}</Text>
                      <View style={styles.userNameCont}>
                        <Text
                          numberOfLines={2}
                          style={styles.userNameText}>{userName}</Text>
                      </View>
                    </> :
                    <>
                      <LogoQROff width={'100%'} height={'100%'} preserveAspectRatio="none" style={{ position: 'absolute', top: 0 }} />
                      <Text style={styles.userTitleText}>{tr.scan_qr_code}</Text>
                    </>
                  }
                  <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanning(true)}>
                    <Text style={styles.scanAgainBtnText}>
                      {userName ? tr.rescan : tr.scan}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottomBlock}>
                  {userName ?
                    <>
                      <Text style={styles.addOrderCostTexta}>{tr.add_order_price}</Text>
                      <TextInput
                        keyboardType={'numeric'}
                        style={styles.inputTaxValuea}
                        placeholder={tr.total_price + ' (GB)'}
                        onChangeText={amount => setAmount(amount)}
                        placeholderColor={'#999999'}
                      />
                      <Text style={styles.instructionText}><Text style={styles.attentionText}>{tr.warning}</Text> {tr.instruction}</Text>
                      <View style={styles.choiceBtnCont}>
                        <TouchableOpacity style={styles.choiceBtnLefta} onPress={() => { getBonus() }}>
                          <Text style={styles.choiceBtnTexta}>{tr.pay}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceBtnRighta} onPress={() => { addBonus() }}>
                          <Text style={[styles.choiceBtnTexta, styles.choiceBtnRightTexta]}>{tr.add_bonus}</Text>
                        </TouchableOpacity>
                        <View style={styles.orPosition}>
                          <View style={styles.choiceBtnOrCont}><Text style={styles.choiceBtnOrText}>{tr.or}</Text></View>
                        </View>
                      </View>
                    </>
                    :
                    <>
                      <Text style={styles.addOrderCostText}>{tr.add_order_price}</Text>
                      <TextInput
                        editable={false}
                        keyboardType={'numeric'}
                        style={styles.inputTaxValue}
                        placeholder={tr.total_price + '(GB)'}
                        placeholderColor={'#bbbbbb'}
                      />
                      <Text style={styles.instructionText}><Text style={styles.attentionText}>{tr.warning}</Text> {tr.instruction}</Text>
                      <View style={styles.choiceBtnCont}>
                        <View style={styles.choiceBtnLeft}>
                          <Text style={styles.choiceBtnText}>{tr.pay}</Text>
                        </View>
                        <View style={styles.choiceBtnRight}>
                          <Text style={[styles.choiceBtnText]}>{tr.add_bonus}</Text>
                        </View>
                        <View style={styles.orPosition}>
                          <View style={styles.choiceBtnOrCont}>
                            <Text style={styles.choiceBtnOrText}>{tr.or}</Text>
                          </View>
                        </View>
                      </View>
                    </>
                  }
                </View>
              </View>
            </ScrollView>
          </>
        }
        {isLoading && <View style={{ flex: 1, justifyContent: 'center', position: "absolute", width: "100%", height: "100%", backgroundColor: "#00000099" }}>
          <ActivityIndicator size="large" color="#35a83a" />
        </View>}
      </SafeAreaView>
    </Fragment >
  );
}

const styles = StyleSheet.create({
  exitImg: {
    height: 20,
    resizeMode: 'contain',
  },
  exitbtn: {

    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  scrollView: {
    flexGrow: 1,
  },
  addOrderCostTexta: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 18,
    color: '#2e2e2e'
  },
  inputTaxValuea: {
    marginTop: 10,
    width: '100%',
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e5e5',
    backgroundColor: '#fff',
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
  },
  body: {
    marginTop: -54,
    flexGrow: 1,
    backgroundColor: '#eeeded',
    alignItems: 'center',
  },
  userTitleText: {

    marginTop: '20%',
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 29,
    color: '#2e2e2e'
  },
  userNameCont: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: '8%',
    width: '78%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
  },
  userNameText: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 29,
    color: '#2e2e2e',
  },
  userMoneyText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 29,
    color: '#35a83a'
  },
  logoCont: {
    width: '100%',
    aspectRatio: 0.95,
    alignItems: 'center',
  },
  userTitleText: {
    marginTop: '20%',
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 29,
    color: '#2e2e2e'
  },

  scanAgainButton: {
    position: 'absolute',
    bottom: '15%',
    width: '78%',
    height: 46,
    borderRadius: 23,
    backgroundColor: '#ffeb3b',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanAgainBtnText: {
    fontSize: 19,
    fontFamily: 'SFUIText-Regular',
  },
  bottomBlock: {
    width: '78%',
    alignItems: 'center',
    paddingVertical: 24,
  },

  addOrderCostText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 18,
    color: '#bbbbbb'
  },
  inputTaxValue: {
    marginTop: 10,
    width: '100%',
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#eeeded',
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
  },
  instructionText: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    color: '#bbbbbb',
    textAlign: 'center',
  },
  attentionText: {
    fontFamily: 'SFUIDisplay-Bold'
  },
  choiceBtnCont: {
    marginTop: 20,
    width: '100%',
    height: 54,
    borderRadius: 27,
    backgroundColor: '#d7d7d7',
    flexDirection: 'row',
  },
  choiceBtnLeft: {
    backgroundColor: '#bbbbbb',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 27,
    borderBottomLeftRadius: 27,
    borderWidth: 5,
    borderColor: 'transparent',
    borderRightWidth: 1,
  },
  choiceBtnLefta: {
    backgroundColor: '#5dc362',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 27,
    borderBottomLeftRadius: 27,
    borderWidth: 5,
    borderColor: 'transparent',
    borderRightWidth: 1,
  },
  choiceBtnTexta: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    color: '#fff',
  },
  choiceBtnRightTexta: {
    color: '#273b4a',
  },
  choiceBtnRighta: {
    backgroundColor: '#ffeb3b',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 27,
    borderBottomRightRadius: 27,
    borderWidth: 5,
    borderColor: 'transparent',
    borderLeftWidth: 1,
  },
  choiceBtnText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    color: '#fff',
  },
  choiceBtnRight: {
    backgroundColor: '#bbbbbb',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 27,
    borderBottomRightRadius: 27,
    borderWidth: 5,
    borderColor: 'transparent',
    borderLeftWidth: 1,
  },
  orPosition: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceBtnOrCont: {
    width: 28,
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceBtnOrText: {
    paddingHorizontal: 0,
    fontFamily: 'SFUIText-Regular',
    fontSize: 12,
    color: '#999999',
    lineHeight: 28,
  },
});

export default HomeOne;
