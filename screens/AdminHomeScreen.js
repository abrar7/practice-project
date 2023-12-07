import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// =====================================================

const AdminHomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    navigation.navigate("confirmUser");
    try {
      const value = await AsyncStorage.removeItem("userRole");
    } catch (e) {
      console.log("errors", e.message);
    }
    FIREBASE_AUTH.signOut();
  };

  const handleAddItems = () => {
    navigation.navigate("addItemForm");
  };

  return (
    <View style={styles.container}>
      <Text> welcome Admin Home Screen</Text>

      <Button
        icon="store-cog-outline"
        mode="contained"
        onPress={handleAddItems}
        style={styles.buttons}
      >
        Add Items
      </Button>
      <Button
        icon="store-cog-outline"
        mode="contained"
        onPress={() => navigation.navigate("checkoutScanner")}
        style={styles.buttons}
      >
        Checkout Scanner
      </Button>
      <Button
        icon="logout"
        mode="contained"
        onPress={handleLogout}
        style={styles.buttons}
      >
        Logout
      </Button>
    </View>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    margin: 20,
  },
});
