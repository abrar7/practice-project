import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

// ================================================

export default function WelcomeScreen() {
  const handleLogout = () => {
    console.log("Logout Pressed");
  };

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ padding: 15 }}>Welcome to our app Screen</Text>
      <Button icon="logout" mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
}
