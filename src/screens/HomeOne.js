import React, { Fragment, useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity, Dimensions, KeyboardAvoidingView,
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCodeScanner, useCameraPermission, Camera, useCameraDevice } from 'react-native-vision-camera';
import { LogoQROff } from '../assets/svg_icons/qr_off_icon.js';
import { LogoQROn } from '../assets/svg_icons/qr_on_icon.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import { HistoryIcon, SettingsIcon } from "../assets/svg_icons/icons.js"
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
  const [amount, setAmount] = useState()
  const [w, setW] = useState("100%")
  const [isLoading, setIsLoading] = useState(false)
  const [scanning, setScanning] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  const keyboard = useKeyboard()
  const [userQR, setQR] = useState()

  useEffect(() => {
    
    if (hasPermission == false) {
      requestPermission()
    }
    setTimeout(() => {
      if(w=="100%"){
        setW("101%")
      }else{setW("100%")}
    }, 200)
   
  }, [scanning])

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      setQR(codes[0].value)
      if(codes[0].value.slice(0, 1)=='{' && codes[0].value.slice(-1)=="}"){
        if (JSON.parse(codes[0].value)?.name) {
          setUserName(`${JSON.parse(codes[0].value).name} ${JSON.parse(codes[0].value).surname}`)
          setUserId(JSON.parse(codes[0].value).id)
          setScanning(false)
        }
      }else{
            setIsLoading(true)
            axios.get(`https://data.halalguide.me/api/user/${codes[0].value}`, {
              headers: {
                Authorization: token
              }
            })
            .then(response => {
              setUserName(response.data.name)
              setUserId(response.data.id)
              setIsLoading(false)
              setScanning(false)
            }).catch(error => {
              setIsLoading(false)
            })
      }
    }
  })

  const addBonus = () => {
    setIsLoading(true)
    axios.post(`https://data.halalguide.me/api/bonus/points/`, { user: userId, amount: amount }, { headers: { Authorization: token } })
      .then(response => {
        Toast.show({
          type: 'success',
          text1: 'Бонусы Зачислены',
        });
        setIsLoading(false)
        setUserName()
        setAmount()
      }).catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Бонусы не Зачислены',
        });
        setUserName()
        setIsLoading(false)
        setAmount()
      })
  }
  const getBonus = () => {
    setIsLoading(true)
    axios.post(`https://data.halalguide.me/api/bonus/points/debit/`, { user: userId, amount: amount }, { headers: { Authorization: token } })
      .then(response => {
        setIsLoading(false)
        Toast.show({
          type: 'success',
          text1: 'Бонусы списаны',
        });
        setUserName()
        setAmount()
      }).catch(error => {
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Бонусы не списаны',
        });
        setUserName()
        setAmount()
      })
  }
  const quit = () => {
    setScanning(false)
  }

  const iconSize = 1.5
  
  return (
<Fragment>
      {scanning?
      <View style={{ flexDirection: "column", alignItems: "center",width:"100%" , height:"100%" }}>
        <Camera
          style={{ width: w, height: "100%" }}
          
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
              {userQR}
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
      :<SafeAreaView style={[{  backgroundColor: "#1e2e34"  },{marginTop:keyboard.keyboardShown&& -keyboard.keyboardHeight/2}]} edges={['top']}>
        <ScrollView bounces={false} 
          contentContainerStyle={styles.scrollView} >
          {userName?
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "position" : null}>
              <View style={{ backgroundColor: "#1e2e34", flexDirection: "row", alignItems: "center", justifyContent: "space-between",position:"absolute" , width:"100%"}}>
                <View style={{ paddingLeft: 10, marginVertical: 10 }}>
                  <TouchableOpacity style={{padding:5}} onPress={() => navigation.navigate('HistoryScreen')}>
                    <HistoryIcon  width={22} height={22} fill="#fff" />
                  </TouchableOpacity>
                  </View>
                  <Text style={{ color: "#FFF", fontWeight: 400, fontSize: 26, }}>HalalBonus</Text>
                  <View style={{ paddingRight: 10 }}>
                    <TouchableOpacity style={{padding:5}}  onPress={() => navigation.navigate('SettingsScreen')}>
                      <SettingsIcon width={22} height={22} fill="#fff" />
                    </TouchableOpacity>
                  </View>
              </View>
              <View style={{height:"100%",backgroundColor:"#eeeded", zIndex:-1,alignItems:"center" , justifyContent:"space-between"}}>
                  
                    <View style={styles.logoCont}>
                      <LogoQROn width={'100%'} height={'100%'} preserveAspectRatio="none" style={{ position: 'absolute', }} />
                      <Text style={styles.userTitleText}>{userName}</Text>
                      <TouchableOpacity style={styles.scanAgainButton} onPress={() =>(setAmount(), setUserName(), setScanning(true),setW("101%"))}>
                        <Text style={styles.scanAgainBtnText}>
                          { tr.rescan }
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.bottomBlock}>
                      <Text style={styles.addOrderCostTexta}>{tr.add_order_price}</Text>
                        <TextInput
                            autoFocus={true}
                            keyboardType={'numeric'}
                            style={styles.inputTaxValuea}
                            placeholder={tr.total_price + ' ₸'}
                            onChangeText={amount => setAmount(amount)}
                            placeholderColor={'#999999'}
                        />
                        <Text style={styles.instructionText}><Text style={styles.attentionText}>{tr.warning}</Text> {tr.instruction}</Text>
                        <View style={styles.choiceBtnCont}>
                          <TouchableOpacity style={styles.choiceBtnLefta} onPress={() => { getBonus() }}>
                            <Text style={styles.choiceBtnTexta}>{tr.pay}</Text>
                          </TouchableOpacity>
                          <View style={styles.orPositionO}>
                            <View style={styles.orPosition}>
                              <View style={styles.choiceBtnOrCont}>
                                <Text style={styles.choiceBtnOrText}>{tr.or}</Text>
                              </View>
                            </View>
                          </View>
                          <TouchableOpacity style={styles.choiceBtnRighta} onPress={() => { addBonus() }}>
                            <Text style={[styles.choiceBtnTexta, styles.choiceBtnRightTexta]}>{tr.add_bonus}</Text>
                          </TouchableOpacity>
                    </View>
                  </View>
              </View>
          </KeyboardAvoidingView>
          :
          <View style={{height:"100%", flexDirection:"column"}}>
          <View style={{ backgroundColor: "#1e2e34", flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
            <View style={{ paddingLeft: 10, marginVertical: 10 }}>
              <TouchableOpacity style={{padding:5}} onPress={() => navigation.navigate('HistoryScreen')}>
                <HistoryIcon  width={22} height={22} fill="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={{ color: "#FFF", fontWeight: 400, fontSize: 26, }}>HalalBonus</Text>
            <View style={{ paddingRight: 10 }}>
              <TouchableOpacity style={{padding:5}}  onPress={() => navigation.navigate('SettingsScreen')}>
                <SettingsIcon width={22} height={22} fill="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:1,backgroundColor:"#eeeded", zIndex:-1}}>
          <View style={{flexDirection:"column",alignItems:"center"}}>
              <View style={styles.logoCont}>
                {userName ?
                  <>
                    <LogoQROn width={'100%'} height={'100%'} preserveAspectRatio="none" style={{ position: 'absolute', }} />
                    
                    <Text style={styles.userTitleText}>{userName}</Text>
                    <TouchableOpacity style={styles.scanAgainButton} onPress={() =>(setAmount(), setUserName(), setScanning(true),setW("101%"))}>
                  <Text style={styles.scanAgainBtnText}>
                    { tr.rescan }
                  </Text>
                </TouchableOpacity>
                  </> :
                  <>
                    <LogoQROff width={'100%'} height={'100%'} preserveAspectRatio="none" style={{ position: 'absolute',}} />
                    <Text style={styles.userTitleText}>{tr.scan_qr_code}</Text>
                    <TouchableOpacity style={styles.scanAgainButton} onPress={() =>(setAmount(), setUserName(), setScanning(true))}>
                  <Text style={styles.scanAgainBtnText}>
                    {tr.scan}
                  </Text>
                </TouchableOpacity>
                  </>
                }
                
              </View>
              <View style={styles.bottomBlock}>
                {userName ?
                  <>
                    <Text style={styles.addOrderCostTexta}>{tr.add_order_price}</Text>
                    <TextInput
                      autoFocus={true}
                      keyboardType={'numeric'}
                      style={styles.inputTaxValuea}
                      placeholder={tr.total_price + ' ₸'}
                      onChangeText={amount => setAmount(amount)}
                      placeholderColor={'#999999'}
                    />
                    <Text style={styles.instructionText}><Text style={styles.attentionText}>{tr.warning}</Text> {tr.instruction}</Text>
                    <View style={styles.choiceBtnCont}>
                      <TouchableOpacity style={styles.choiceBtnLefta} onPress={() => { getBonus() }}>
                        <Text style={styles.choiceBtnTexta}>{tr.pay}</Text>
                      </TouchableOpacity>
                      <View style={styles.orPositionO}>
                        <View style={styles.orPosition}>
                          <View style={styles.choiceBtnOrCont}>
                            <Text style={styles.choiceBtnOrText}>{tr.or}</Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.choiceBtnRighta} onPress={() => { addBonus() }}>
                        <Text style={[styles.choiceBtnTexta, styles.choiceBtnRightTexta]}>{tr.add_bonus}</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                  :
                  <>
                    <Text style={styles.addOrderCostText}>{tr.add_order_price}</Text>
                    <TextInput
                      editable={false}
                      keyboardType={'numeric'}
                      style={styles.inputTaxValue}
                      placeholder={tr.total_price + ' ₸'}
                      placeholderColor={'#bbbbbb'}
                      defaultValue={amount}
                    />
                    <Text style={styles.instructionText}><Text style={styles.attentionText}>{tr.warning}</Text> {tr.instruction}</Text>
                    <View style={styles.choiceBtnCont}>
                      <View style={styles.choiceBtnLeft}>
                        <Text style={styles.choiceBtnText}>{tr.pay}</Text>
                      </View>
                      <View style={styles.orPosition}>
                        <View style={styles.choiceBtnOrCont}>
                          <Text style={styles.choiceBtnOrText}>{tr.or}</Text>
                        </View>
                      </View>
                      <View style={styles.choiceBtnRight}>
                        <Text style={[styles.choiceBtnText]}>{tr.add_bonus}</Text>
                      </View>
                    </View>
                  </>
                }
              </View>
            </View>
          </View>
          </View>}
        </ScrollView>
      </SafeAreaView>}
      {isLoading && <View style={{ flex: 1, justifyContent: 'center', position: "absolute", width: "100%", height: "100%", backgroundColor: "#00000099" }}>
          <ActivityIndicator size="large" color="#35a83a" />
        </View>}
    </Fragment>
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
    height:"100%"
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
  userNameCont: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,

  },
  userNameText: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 29,
    color: '#2e2e2e',

    backgroundColor: '#fff',
    marginTop:"40%", padding:10, width:"100%", textAlign:"center"
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
    flexDirection:"column",
    justifyContent:"space-between",
    paddingTop:30
  },
  userTitleText: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 29,
    color: '#2e2e2e',
    marginTop:50
  },

  scanAgainButton: {
    width: '80%',
    height: 46,
    borderRadius: 23,
    backgroundColor: '#ffeb3b',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:"25%"
  },
  scanAgainBtnText: {
    fontSize: 19,
    fontFamily: 'SFUIText-Regular',
  },
  bottomBlock: {
    width: '80%',
    alignItems: 'center',
    paddingVertical:20
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
    zIndex:-1
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
    zIndex:1
  },
  orPositionO: {
    width: 0,
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
