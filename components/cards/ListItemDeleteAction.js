import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ===================================================================

export default function ListItemDeleteAction({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="trash-can" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 120,
    paddingHorizontal: 35,
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
