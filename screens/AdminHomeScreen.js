import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { FIREBASE_AUTH } from "../FirebaseConfig";

// =====================================================

const AdminHomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
    navigation.navigate("confirmUser");
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
