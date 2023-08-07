import React from "react";
import { StyleSheet, View } from "react-native";

// ===================================================================

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 5,
    backgroundColor: "#34d1ce",
  },
});

export default ListItemSeparator;
