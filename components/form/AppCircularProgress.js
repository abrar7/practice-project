import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

// ===================================================================

export default function AppCircularProgress({ color }) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        animating={true}
        color={color}
        size="small"
        style={{ transform: [{ scale: 1.0 }] }}
      />
    </View>
  );
}
