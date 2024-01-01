import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useKeyboard} from '@react-native-community/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogoQROn} from '../assets/svg_icons/qr_on_icon.js';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import {HistoryIcon, SettingsIcon} from '../assets/svg_icons/icons.js';
import Toast from 'react-native-toast-message';
import {useRoute} from '@react-navigation/native';

const tr = {
  signin: 'Вход',
  password: 'Пароль',
  login: 'Войти',
  scan_qr_code: 'Сканировать QR код',
  scan: 'Сканировать',
  add_order_price: 'Стоимость заказа',
  pay: 'Оплатить',
  add_bonus: 'Зачислить',
  or: 'или',
  warning: 'Внимание!',
  instruction:
    'Вводите всю сумму заказа, Количество баллов расчитывается автоматически',
  total_price: 'Общий счет',
  cancel: 'Отмена',
  place_qr_code: 'Наведите телефон на QR-код',
  place_qr_code2: 'Сканирование выполняется автоматически',
  customer: '',
  rescan: 'Сканировать еще раз',
  bonus_added: 'Бонусы зачиcлены',
  payed_with_bonus: 'Оплачено бонусами',
  main: 'Основное',
  history: 'История',
};

const HomeOne = ({navigation}) => {
  const route = useRoute();
  const token = useSelector(state => state.Reducers.authToken);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState('');
  const [amount, setAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const keyboard = useKeyboard();

  const addBonus = () => {
    if (amount) {
      setIsLoading(true);
      axios
        .post(
          `https://data.halalguide.me/api/bonus/points/`,
          {user: userId, amount: amount},
          {headers: {Authorization: token}},
        )
        .then(response => {
          Toast.show({
            type: 'success',
            text1: 'Бонусы Зачислены',
          });
          setIsLoading(false);
          setUserName('');
          setAmount(null);
          navigation.navigate('MainScreen');
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Бонусы не Зачислены',
          });
          setIsLoading(false);
        });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Введите сумму',
      });
    }
  };

  const getBonus = () => {
    if (amount) {
      setIsLoading(true);
      axios
        .post(
          `https://data.halalguide.me/api/bonus/points/debit/`,
          {user: userId, amount: amount},
          {headers: {Authorization: token}},
        )
        .then(response => {
          setIsLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Бонусы списаны',
          });
          setUserName('');
          setAmount(null);
          setIsLoading(false);
          navigation.navigate('MainScreen');
        })
        .catch(error => {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Бонусы не списаны',
          });
        });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Введите сумму',
      });
    }
  };

  useEffect(() => {
    setUserId(route.params?.userId);
    setUserName(route.params?.username);
    if (!route.params?.userId) {
      navigation.navigate('MainScreen');
    }
  }, []);

  return (
    <SafeAreaView style={{flexDirection: 'column'}}>
      <View
        style={{
          backgroundColor: '#1e2e34',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{paddingLeft: 20, marginVertical: 10}}>
          <TouchableOpacity>
            <HistoryIcon
              onPress={() => navigation.navigate('HistoryScreen')}
              width={30}
              height={30}
              fill="#fff"
            />
          </TouchableOpacity>
        </View>
        <Text style={{color: '#FFF', fontWeight: 400, fontSize: 26}}>
          HalalBonus
        </Text>
        <View style={{paddingRight: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsScreen')}>
            <SettingsIcon width={30} height={30} fill="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={[styles.scrollView]}>
        <View
          style={[
            styles.body,
            {
              marginTop: -54,
            },
          ]}>
          <View style={styles.logoCont}>
            <LogoQROn
              width={'100%'}
              height={'100%'}
              preserveAspectRatio="none"
              style={{position: 'absolute'}}
            />
            <Text style={styles.userTitleText}>{tr.customer}</Text>
            <View style={styles.userNameCont}>
              <Text numberOfLines={2} style={styles.userNameText}>
                {userName ? userName : null}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.scanAgainButton}
              onPress={() => navigation.navigate('ScanScreen')}>
              <Text style={styles.scanAgainBtnText}>{tr?.rescan}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBlock}>
            <Text style={styles.addOrderCostTexta}>{tr?.add_order_price}</Text>
            <TextInput
              keyboardType={'numeric'}
              style={styles.inputTaxValuea}
              placeholder={tr.total_price + ' (₸)'}
              onChangeText={amount => setAmount(amount)}
              placeholderColor={'#999999'}
              autoFocus={true}
            />
            <Text style={styles.instructionText}>
              <Text style={styles.attentionText}>{tr?.warning}</Text>
              {tr?.instruction}
            </Text>
            <View style={styles.choiceBtnCont}>
              <TouchableOpacity
                style={styles.choiceBtnLefta}
                onPress={() => {
                  getBonus();
                }}>
                <Text style={styles.choiceBtnTexta}>{tr?.pay}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.choiceBtnRighta}
                onPress={() => {
                  addBonus();
                }}>
                <Text
                  style={[styles.choiceBtnTexta, styles.choiceBtnRightTexta]}>
                  {tr?.add_bonus}
                </Text>
              </TouchableOpacity>
              <View style={styles.orPosition}>
                <View style={styles.choiceBtnOrCont}>
                  <Text style={styles.choiceBtnOrText}>{tr?.or}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#00000099',
          }}>
          <ActivityIndicator size="large" color="#35a83a" />
        </View>
      )}
    </SafeAreaView>
  );
};
export default HomeOne;
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
    marginVertical: 10,
  },
  scrollView: {
    flexGrow: 1,
    height: '100%',
  },
  addOrderCostTexta: {
    // fontFamily: 'SFUIDisplay-Bold',
    fontSize: 18,
    color: '#2e2e2e',
  },
  inputTaxValuea: {
    marginTop: 10,
    width: '100%',
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e5e5',
    backgroundColor: '#fff',
    // fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
  },
  body: {
    flexGrow: 1,
    backgroundColor: '#eeeded',
    alignItems: 'center',
  },
  userTitleText: {
    marginTop: '20%',
    // fontFamily: 'SFUIDisplay-Light',
    fontSize: 29,
    color: '#2e2e2e',
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
    // fontFamily: 'SFUIDisplay-Light',
    fontSize: 29,
    color: '#2e2e2e',
  },
  userMoneyText: {
    // fontFamily: 'SFUIDisplay-Bold',
    fontSize: 29,
    color: '#35a83a',
  },
  logoCont: {
    width: '100%',
    aspectRatio: 0.95,
    alignItems: 'center',
  },
  userTitleText: {
    marginTop: '20%',
    // fontFamily: 'SFUIDisplay-Light',
    fontSize: 29,
    color: '#2e2e2e',
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
    // fontFamily: 'SFUIText-Regular',
  },
  bottomBlock: {
    width: '78%',
    alignItems: 'center',
    paddingVertical: 24,
  },

  addOrderCostText: {
    // fontFamily: 'SFUIDisplay-Bold',
    fontSize: 18,
    color: '#bbbbbb',
  },
  inputTaxValue: {
    marginTop: 10,
    width: '100%',
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#eeeded',
    // fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
  },
  instructionText: {
    marginTop: 15,
    fontSize: 14,
    // fontFamily: 'SFUIDisplay-Regular',
    color: '#bbbbbb',
    textAlign: 'center',
  },
  attentionText: {
    // fontFamily: 'SFUIDisplay-Bold'
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
    // fontFamily: 'SFUIText-Regular',
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
    // fontFamily: 'SFUIText-Regular',
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
    // fontFamily: 'SFUIText-Regular',
    fontSize: 12,
    color: '#999999',
    lineHeight: 28,
  },
});
