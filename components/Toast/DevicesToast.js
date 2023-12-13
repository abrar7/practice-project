import React from "react";
import { View, Platform, Alert, ToastAndroid } from "react-native";

//==============================================

export default function DevicesToast(message) {
  return (
    <View>
      {Platform.OS === "android"
        ? ToastAndroid.show(message, ToastAndroid.LONG)
        : Alert.alert("Message", message)}
    </View>
  );
}
