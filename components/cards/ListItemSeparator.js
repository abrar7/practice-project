import React from "react";
import { StyleSheet, View } from "react-native";

// ===================================================================

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 0.8,
    marginVertical: 2,
    backgroundColor: "#333438",
  },
});

export default ListItemSeparator;
