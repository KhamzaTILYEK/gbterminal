import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogoQROff} from '../assets/svg_icons/qr_off_icon.js';
import {HistoryIcon, SettingsIcon} from '../assets/svg_icons/icons.js';

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
  customer: 'Пользователь',
  rescan: 'Сканировать еще раз',
  bonus_added: 'Бонусы зачиcлены',
  payed_with_bonus: 'Оплачено бонусами',
  main: 'Основное',
  history: 'История',
};

const HomeMain = ({navigation}) => {
  return (
    <>
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
          <View style={[styles.body, {marginTop: -54}]}>
            <View style={styles.logoCont}>
              <LogoQROff
                width={'100%'}
                height={'100%'}
                preserveAspectRatio="none"
                style={{position: 'absolute'}}
              />
              <Text style={styles.userTitleText}>{tr?.scan_qr_code}</Text>
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => navigation.navigate('ScanScreen')}>
                <Text style={styles.scanAgainBtnText}>{tr?.scan}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomBlock}>
              <Text style={styles.addOrderCostText}>{tr.add_order_price}</Text>
              <TextInput
                editable={false}
                keyboardType={'numeric'}
                style={styles.inputTaxValue}
                placeholder={tr.total_price + '(₸)'}
                placeholderColor={'#bbbbbb'}
                autoFocus={true}
              />
              <Text style={styles.instructionText}>
                <Text style={styles.attentionText}>{tr.warning}</Text>{' '}
                {tr.instruction}
              </Text>
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
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default HomeMain;
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
    fontFamily: 'SFUIDisplay-Light',
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
