import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@ui-kitten/components";

// ======================================

export default function PaymentSuccessfull({ navigation }) {
  const handleClick = () => {
    navigation.navigate("customerHomeScreen");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "cyan" }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          marginTop: 50,
        }}
      >
        <Image
          source={require("../assets/payment.png")}
          style={{
            width: 300,
            height: 300,
            marginBottom: 50,

            borderColor: "black",
          }}
        />
        <Text style={styles.text}>Payment was Successfull!</Text>
        <Text style={styles.text}>Thanks for shopping</Text>
        <Text style={styles.text}>Come back soon</Text>
        <Button
          style={styles.button}
          onPress={handleClick}
          status="primary"
          size="large"
        >
          Back to Home Screen
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontWeight: "700",
  },
  button: {
    margin: 42,
  },
});
