import React, {useEffect, useState, Fragment} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PlusIcon, MinusIcon, BackIcon} from '../assets/svg_icons/icons.js';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
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
  lang: 'Язык',
  quit: 'Выйти',
  email: 'Электронная почта',
  history: 'История',
};
export default function HistoryScreen({navigation}) {
  const token = useSelector(state => state.Reducers.authToken);
  const [history, setHistory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://data.halalguide.me/api/bonus/points/`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        setHistory(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  return (
    <Fragment>
      <StatusBar backgroundColor="#1e2e34" barStyle="light-content" />
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#1e2e34'}}
        edges={['top']}>
        <View
          style={{
            backgroundColor: '#1e2e34',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{paddingLeft: 20, marginVertical: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainScreen')}
              style={{paddingRight: 5}}>
              <BackIcon width={30} height={30} fill="#1e2e34" color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={{color: '#FFF', fontWeight: 400, fontSize: 26}}>
            {tr?.history}
          </Text>
          <View style={{paddingRight: 20, width: 50}}></View>
        </View>
        {isLoading ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 50,
              }}>
              <ActivityIndicator size="large" color="#35a83a" />
            </View>
          </>
        ) : (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.scrollView}>
            <View>
              {history?.results !== 0 &&
                history?.results.map((item, index) => {
                  return (
                    <View
                      key={`history_list_${index}`}
                      style={styles.blockCont}>
                      {item?.amount > 0 ? (
                        <PlusIcon width={28} height={28} />
                      ) : (
                        <MinusIcon width={28} height={28} />
                      )}
                      <View style={styles.textCont}>
                        <Text numberOfLines={1} style={styles.userNameText}>
                          {item?.user.name}
                        </Text>
                        <Text style={styles.dateText}>{item?.date}</Text>
                      </View>
                      <Text style={styles.sumText}>{item?.amount} ₸</Text>
                    </View>
                  );
                })}
            </View>
            {history?.results ? null : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 500,
                }}>
                <Text>Нет данных</Text>
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#eeeded',
  },
  body: {
    flexGrow: 1,
    backgroundColor: '#eeeded',
    alignItems: 'center',
  },
  blockCont: {
    backgroundColor: '#fff',
    marginTop: 6,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 18,
  },
  textCont: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  userNameText: {
    fontSize: 18,
    fontFamily: 'SFUIDisplay-Regular',
    color: '#000',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Regular',
    color: '#b5b5b5',
  },
  sumText: {
    fontSize: 18,
    fontFamily: 'SFUIDisplay-Regular',
    color: '#000000',
  },
});
