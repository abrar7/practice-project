import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// ==================================================

export default function AppReceiptButton({ buttonText, onPress }) {
  return (
    <TouchableOpacity style={styles.touchableOpacityView} onPress={onPress}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacityView: {
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 7,
    backgroundColor: "#2c2c2d",
  },
  text: {
    padding: 15,
    fontSize: 26,
    color: "white",
  },
});
