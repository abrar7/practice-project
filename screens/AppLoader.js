import React from "react";
import { Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, ImageBackground, View } from "react-native";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// ==================================================

export default function AppLoader() {
  return (
    <>
      <DeviceSafeArea />
      <ImageBackground
        source={require("../assets/cart6.jpg")}
        resizeMode="cover"
        style={styles.container}
        blurRadius={20}
      >
        <View style={styles.imageConatiner}>
          <Ionicons name="cart" size={74} color="white" />
          <Text category="h4" style={{ color: "white" }}>
            Digicart
          </Text>
        </View>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.text}>Loading App...</Text>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  loader: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  imageConatiner: {
    display: "flex",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 15,
    color: "white",
  },
});
