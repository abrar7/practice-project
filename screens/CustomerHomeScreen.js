import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, SafeAreaView, StatusBar } from "react-native";
import { Text } from "@ui-kitten/components";
import { ActivityIndicator } from "react-native-paper";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../components/form/AppButton";

// ==================================================

export default function CustomerHomeScreen({ navigation }) {
  const [userName, setUserName] = useState();
  const database = FIRESTORE_DB;

  const handleLogout = async () => {
    navigation.navigate("confirmUser");
    await FIREBASE_AUTH.signOut();
    try {
      await AsyncStorage.removeItem("userRole");
    } catch (e) {
      console.log("errors", e.message);
    }
  };

  useEffect(() => {
    const currentUserUid = FIREBASE_AUTH.currentUser.uid;
    const getName = async () => {
      const response = await getDocs(
        query(collection(database, "user"), where("id", "==", currentUserUid))
      );
      const documentData = response.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setUserName(documentData[0].username);
    };
    getName();
  }, []);

  const handleShop = () => {
    Alert.alert("Confirmation", "Are you at supermarket right now?", [
      {
        text: "Yes",
        onPress: () => navigation.navigate("itemCards"),
      },
      {
        text: "No",
        onPress: () => {
          alert("Kindly reached at supermaket to use service.");
        },
      },
    ]);
  };

  return userName ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageConatiner}>
        <Ionicons name="cart" size={74} color="white" />
        <Text category="h4" style={{ color: "white" }}>
          Digicart
        </Text>
      </View>
      <View>
        <Text style={styles.welcome}>Welcome {userName.toUpperCase()}</Text>
      </View>
      <AppButton title="Ready to shop?" onPress={handleShop} />
      <AppButton title="Logout" onPress={handleLogout} icon="logout" />
    </SafeAreaView>
  ) : (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#202124",
    alignItems: "center",
  },
  imageConatiner: {
    display: "flex",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    color: "white",
    fontSize: 32,
    marginBottom: 20,
  },
  button: {
    margin: 15,
  },
  loader: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
