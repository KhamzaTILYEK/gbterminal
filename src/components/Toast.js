import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
export default function Toast({ show, message, type, w ,setShowToast}) {
    return (
        <>
            {show? <View style={{
                position: 'absolute',
                marginTop: 60,
                zIndex: 20,
                right: "10%",
                width: w ? w : "80%",
                flexDirection: "row",
            }
            } >
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
                    padding: 20, alignItems:"center"
                }}>
                    <Text style={{ color: "#000", fontWeight: 500 }}>{message}</Text>
                    <TouchableOpacity onPress={()=>(setShowToast(false))} style={{position:"absolute", right:8, top:3}}><Text>X</Text></TouchableOpacity>
                </View>
            </View > : null
            }
        </>
    )
}
