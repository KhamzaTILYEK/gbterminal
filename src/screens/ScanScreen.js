import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import {
  useCodeScanner,
  useCameraPermission,
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import axios from 'axios';
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

export default function ScanScreen({ navigation }) {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const token = useSelector(state => state.Reducers.authToken);
  const [active, setActive] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const iconSize = 1.5;

  useEffect(() => {
    (async () => {
      try {
        if (!hasPermission) {
          const result = await requestPermission();
          setTimeout(() => {
            setActive(true);
          }, 1000);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (
        codes[0].value.slice(0, 1) == '{' &&
        codes[0].value.slice(-1) == '}'
      ) {
        if (JSON.parse(codes[0].value)?.name) {
          navigation.navigate('HomeScreen', {
            userId: JSON.parse(codes[0].value).id,
            username: `${JSON.parse(codes[0].value).name} ${JSON.parse(codes[0].value).surname
              }`,
            date: Date(),
          });
        } else {
          axios
            .get(`https://data.halalguide.me/api/user/${codes[0].value}`, {
              headers: {
                Authorization: token,
              },
            })
            .then(response => {
              setActive(false);
              navigation.navigate('HomeScreen', {
                userId: response.data.id,
                username: response.data.name,
                date: Date(),
              });
            })
            .catch(error => { });
        }
      } else {
        axios
          .get(`https://data.halalguide.me/api/user/${codes[0].value}`, {
            headers: {
              Authorization: token,
            },
          })
          .then(response => {
            setActive(false);
            navigation.navigate('HomeScreen', {
              userId: response.data.id,
              username: response.data.name,
              date: Date(),
            });
          })
          .catch(error => { });
      }
    },
  });

  return (


    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Camera
        style={{ width: '100%', height: '100%' }}
        device={device}
        isActive={active}
        codeScanner={codeScanner}
      />
      <View
        style={{
          position: 'absolute',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-around',
        }}>
        {/* Logo */}
        <View
          style={{
            borderRadius: 10 * iconSize,
            borderWidth: 2 * iconSize,
            borderColor: '#fff',
            padding: 4 * iconSize,
            flexDirection: 'column',
          }}>
          <View
            style={{
              borderColor: '#fff',
              borderBottomWidth: 2 * iconSize,
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderColor: '#fff',
                borderWidth: 2 * iconSize,
                marginBottom: 3 * iconSize,
                borderRadius: 3 * iconSize,
                padding: 3 * iconSize,
              }}></View>
            <View
              style={{
                borderWidth: iconSize,
                borderColor: '#fff',
                marginHorizontal: 2 * iconSize,
              }}></View>
            <View
              style={{
                borderColor: '#fff',
                borderWidth: 2 * iconSize,
                marginBottom: 3 * iconSize,
                borderRadius: 3 * iconSize,
                padding: 3 * iconSize,
              }}></View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                borderColor: '#fff',
                borderWidth: 2 * iconSize,
                marginTop: 3 * iconSize,
                borderRadius: 3 * iconSize,
                padding: 3 * iconSize,
              }}></View>
            <View
              style={{
                borderWidth: iconSize,
                borderColor: '#fff',
                marginHorizontal: 2 * iconSize,
              }}></View>
            <View
              style={{
                borderColor: '#fff',
                borderWidth: 2 * iconSize,
                marginTop: 3 * iconSize,
                borderRadius: 3 * iconSize,
                padding: 3 * iconSize,
              }}></View>
          </View>
        </View>
        {/* Text1 */}
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 26,
            fontWeight: 600,
            paddingHorizontal: 20,
          }}>
          {tr.place_qr_code}
        </Text>
        {/* Box */}
        <View
          style={{
            borderWidth: 2,
            borderColor: '#ffeb3b',
            borderRadius: 20,
            width: '100%',
            height: windowWidth - 30,
          }}></View>
        {/* Text2 */}
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontWeight: 500,
          }}>
          {tr.place_qr_code2}
        </Text>
        <View style={{ height: 42, width: '100%' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainScreen')}
            style={{
              width: '100%',
              borderRadius: 15,
              borderWidth: 2,
              borderColor: '#fff',
              flex: 1,
              alignItems: 'center',
              padding: 5,
              backgroundColor: '#ffffff33',
            }}>
            <Text style={{ color: '#fff', fontWeight: 500, fontSize: 18 }}>
              {tr.cancel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!active && <View
        style={{
          flex: 1,
          justifyContent: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#00000099',
        }}>
        <ActivityIndicator size="large" color="#35a83a" />
      </View>}
    </View>

  );
}
