import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Button } from "react-native-paper";

// ===================================================================

export default function GenerateQRCode({ route, navigation }) {
  const { id: itemUid, product: itemName, price: cost } = route.params;
  const data = { id: itemUid, productName: itemName };
  const jsonData = JSON.stringify(data);

  return (
    <View style={styles.container}>
      <QRCode value={jsonData} size={200} />
      <Text style={styles.text}>{`${itemName}, ${"$" + cost}`}</Text>

      <Button
        icon="store-cog-outline"
        mode="contained"
        onPress={() => navigation.navigate("addItemForm")}
        style={styles.buttons}
      >
        Add new item
      </Button>
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
  text: {
    paddingTop: 30,
    fontSize: 30,
    color: "black",
  },
});
