import { StyleSheet, Text, View } from "react-native";
import React from "react";

// ===================================================================

export default function EmptyListMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Your cart is empty, Press camera button and scan the item.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#212226",
    fontSize: 22,
    textAlign: "center",
  },
});
