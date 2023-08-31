import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

// ==================================================

export default function AppLoader() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="black" />
      <Text style={styles.text}>Loading App...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    marginTop: 15,
  },
});
