import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { Button } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ==================================================

export default function CustomerHomeScreen({ navigation }) {
  const [userName, setUserName] = useState();
  const database = FIRESTORE_DB;

  const handleLogout = async () => {
    navigation.navigate("confirmUser");
    FIREBASE_AUTH.signOut();
    try {
      const value = await AsyncStorage.removeItem("userRole");
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
    // <View style={styles.container}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Welcome {userName}</Text>

      <Button
        appearance="filled"
        status="primary"
        size="large"
        onPress={handleShop}
        style={styles.button}
      >
        Ready to shop?
      </Button>
      <Button
        appearance="filled"
        status="primary"
        size="large"
        onPress={handleLogout}
        style={styles.button}
        accessoryLeft={<AntDesign name="logout" size={20} color="white" />}
      >
        Logout
      </Button>
    </SafeAreaView>
  ) : (
    // {/* </View> */}
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "cyan",
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 32,
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
