import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

// ===================================================================

export default function GenerateQRCode({ route, navigation }) {
  const { id: itemUid, product: itemName, price: cost } = route.params;
  const data = { id: itemUid, productName: itemName };
  const jsonData = JSON.stringify(data);

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode value={jsonData} size={200} />
        <Text style={styles.text}>{`${itemName}, ${"Rs. " + cost}`}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          size="large"
          appearance="filled"
          status="primary"
          onPress={() => navigation.navigate("addItemForm")}
          style={{ borderRadius: 15, padding: 15 }}
          accessoryLeft={
            <MaterialIcons name="inventory" size={22} color="white" />
          }
        >
          Add more items
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#202124",
  },
  qrContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    paddingTop: 30,
    fontSize: 30,
    color: "white",
  },
});
