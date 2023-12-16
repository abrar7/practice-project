import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@ui-kitten/components";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../components/utils/COLORS";

// ======================================

export default function PaymentSuccessfull({ navigation }) {
  const handleClick = () => {
    navigation.navigate("customerHomeScreen");
  };

  return (
    <>
      <DeviceSafeArea />
      <View
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.bgColor,
        }}
      >
        <AntDesign
          name="checkcircle"
          size={100}
          color="white"
          style={{ flex: 0.3 }}
        />
        <Text style={styles.text}>Payment was Successfull</Text>
        <Text style={styles.text}>Thanks for shopping</Text>
        <Text style={styles.text}>Come back soon 😊</Text>
        <Button
          size="large"
          status="primary"
          onPress={handleClick}
          style={styles.button}
        >
          Back to Home Screen
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontWeight: "700",
    color: "white",
  },
  button: {
    margin: 42,
    borderRadius: 15,
  },
});
