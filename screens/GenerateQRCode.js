import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";

// ===================================================================

const data = [
  { id: 1, name: "Object 1" },
  { id: 2, name: "Object 2" },
];

const jsonData = JSON.stringify(data);

export default function GenerateQRCode() {
  return (
    <View style={styles.container}>
      <QRCode value={jsonData} size={200} />

      {/* <Text>Scan this QR code to retrieve the array of objects</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
