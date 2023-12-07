import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text } from "@ui-kitten/components";
import QRCode from "react-native-qrcode-svg";

// ===================================================================

export default function CheckoutQRCode({ route, navigation }) {
  const { grandTotal, data } = route.params;
  const { weightAge, purchasedItems, checkoutScanned } = data;

  console.log("checkoutScanned", checkoutScanned);

  const QRData = { checkoutScanned: checkoutScanned };
  const jsonData = JSON.stringify(QRData);

  const handleNext = () => {
    navigation.navigate("stripePayment", {
      grandTotal: grandTotal,
    });
  };

  return (
    <ImageBackground
      source={require("../assets/qrcodebg.jpg")}
      resizeMode="cover"
      style={styles.container}
      blurRadius={20}
    >
      <View style={styles.logoConatiner}>
        <Ionicons name="cart" size={74} color="white" />
        <Text category="h4" style={{ color: "white" }}>
          Digicart
        </Text>
      </View>
      <View style={styles.qrcodeContainer}>
        <Text category="h4" style={styles.text}>
          Kindly go to the checkout point device located in store and scan this
          QR code
        </Text>
        <View style={styles.qrcode}>
          <QRCode value={jsonData} size={300} />
        </View>
        <View style={styles.detailsContainer}>
          <Text category="h5" style={styles.detailsText}>
            Weightage: {weightAge} kg
          </Text>
          <Text category="h5" style={styles.detailsText}>
            Total bill: Rs.{grandTotal}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          size="giant"
          appearance="filled"
          status="primary"
          onPress={() => navigation.goBack()}
          style={{ borderRadius: 50, width: 110 }}
        >
          Back
        </Button>
        <Button
          size="giant"
          appearance="outline"
          status="success"
          // disabled
          onPress={handleNext}
          style={{ borderRadius: 50, width: 110 }}
        >
          Next
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  logoConatiner: {
    display: "flex",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  qrcodeContainer: {
    flex: 0.6,
    alignItems: "center",
  },
  qrcode: { margin: 5 },
  text: { color: "white", marginBottom: 25 },
  detailsContainer: { marginTop: 15 },
  detailsText: { color: "white" },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "100%",
    justifyContent: "space-around",
  },
  button: {
    margin: 2,
  },
});
