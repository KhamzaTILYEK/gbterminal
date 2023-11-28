import React from 'react'
import { View, Text } from 'react-native'
import colors from '../constants/colors'
export default function Toast({ show, message, type }) {

    return (
        <>
            {show ? <View style={{
                position: 'absolute',
                marginTop: 20,
                zIndex: 20,
                right: "5%",
                width: "90%",
                flexDirection: "row",
            }}>
                <View style={{
                    backgroundColor:
                        (type == "error" ? colors.deepCarminePink :
                            (type == "done" ? colors.spanishGreen :
                                type == "warning" ? colors.warning : '#aaa')),
                    width: 8,
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10
                }}></View>
                <View style={{
                    width: "100%",
                    backgroundColor: "#FFF",
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    borderWidth: 0.5,
                    borderColor: "#555",
                    padding: 20
                }}>
                    <Text style={{ color: "#000", fontWeight: 500 }}>{message}</Text>
                </View>
            </View > : null
            }
        </>
    )
}
