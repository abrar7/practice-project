import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { FIRESTORE_DB } from "../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { User } from "firebase/auth";

// ================================================

export default function WelcomeScreen() {
  const database = FIRESTORE_DB;

  const handleLogout = () => {
    console.log("Logout Pressed");
  };

  const handleLogic = async () => {
    const role = await getDocs(
      query(collection(database, "user"))
      // query(collection(database, "user"), where("pin", "==", data.pin))
    );
    const documentData = role.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    console.log("user", User);

    console.log("documentData", documentData);
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
      <Button icon="logout" mode="contained" onPress={handleLogic}>
        test
      </Button>
    </View>
  );
}
