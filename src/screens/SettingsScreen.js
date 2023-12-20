import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity, 
} from 'react-native';

import { BackIcon } from "../assets/svg_icons/icons.js"
import axios from 'axios';
import { RU, EN } from './flags.js';
import { Logout } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';

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
    history: 'История',
    settings: "Настройки",
    settingsText: "Основное"
}

export default function SettingsScreen({ navigation }) {

    const token = useSelector(state => state.Reducers.authToken);
    const dispatch = useDispatch()

    const setLang = (e) => {
        console.log(e);
    }

    const logout = () => {

        dispatch(Logout())
    }
    const [history, setHistory] = useState()

    useEffect(() => {
        axios.get(`https://data.halalguide.me/api/user/`, {

        })
            .then(response => {

            }).catch(error => {
                console.log(error);

            })
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1e2e34" }}>
            <View style={{ backgroundColor: "#1e2e34", flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                <View style={{ paddingLeft: 20, marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{}}>
                        <BackIcon  width={30} height={30} fill="#1e2e34" color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "#FFF", fontWeight: 400, fontSize: 26, }}>{tr?.settings}</Text>
                <View style={{ paddingRight: 20 }}>

                </View>
            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={styles.scrollView}>
                <View>
                    <View style={{ backgroundColor: "#fff", padding: 20 }}>
                        <Text style={{ color: "#35a83a" }}>{tr.settingsText}</Text>
                        <View style={{ borderBottomWidth: 2, borderColor: "#eeeded", fontSize: 16, fontWeight: 500, paddingBottom: 10 }}></View>
                        <View>
                            <Text>{tr.lang}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <TouchableOpacity onPress={() => { setLang(e = "EN") }}>
                                <View style={{ flexDirection: "row", padding: 5, backgroundColor: "#aaa", borderRadius: 5 }}>
                                    <EN width={50} height={25} />
                                    <Text>English</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setLang(e = "RU") }}>
                                <View style={{ flexDirection: "row", padding: 5, backgroundColor: "#35a83a", borderRadius: 5 }}>
                                    <RU width={50} height={25} />
                                    <Text>Русский</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#fff", padding: 20, marginTop: 5, }}>
                        <TouchableOpacity onPress={() => { logout() }} style={{}}>
                            <View style={{ borderRadius: 15, borderWidth: 2, borderColor: "#aaa", padding: 10, alignItems: "center" }}>
                                <Text>{tr.quit}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#eeeded',
        flexDirection: "column",
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
        color: '#000'
    },
    dateText: {
        fontSize: 12,
        fontFamily: 'SFUIDisplay-Regular',
        color: '#b5b5b5',
    },
    sumText: {
        fontSize: 18,
        fontFamily: 'SFUIDisplay-Regular',
        color: '#000000'
    },
});