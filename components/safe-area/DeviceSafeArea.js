import React from "react";
import { View, StyleSheet } from "react-native";

// ===================================================

export default function DeviceSafeArea() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    backgroundColor: "white",
  },
});
