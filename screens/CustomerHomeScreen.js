import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, SafeAreaView, StatusBar } from "react-native";
import { Text } from "@ui-kitten/components";
import { ActivityIndicator } from "react-native-paper";
import { collection, getDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/form/AppButton";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// ==================================================

export default function CustomerHomeScreen({ navigation }) {
  const [userName, setUserName] = useState();
  const database = FIRESTORE_DB;

  const handleLogout = async () => {
    await FIREBASE_AUTH.signOut();
    try {
      await AsyncStorage.removeItem("userRole");
    } catch (e) {
      console.log("errors", e.message);
    }
  };

  useEffect(() => {
    const currentUserUid = FIREBASE_AUTH.currentUser.uid;
    const getUserName = async () => {
      const userRef = doc(collection(database, "user"), currentUserUid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      setUserName(userData?.username);
    };
    getUserName();
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
    <>
      <DeviceSafeArea />
      <View style={styles.container}>
        <View style={styles.imageConatiner}>
          <Ionicons name="cart" size={74} color="white" />
          <Text category="h4" style={{ color: "white" }}>
            Digicart
          </Text>
        </View>
        <View>
          <Text style={styles.welcome}>Welcome {userName.toUpperCase()}</Text>
        </View>
        <AppButton
          title="Ready to shop?"
          icon="shoppingcart"
          onPress={handleShop}
        />
        <AppButton title="Logout" onPress={handleLogout} icon="logout" />
      </View>
    </>
  ) : (
    <>
      <DeviceSafeArea />
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="black"
          style={{ marginBottom: 10 }}
        />
        <Text>Loading...</Text>
      </View>
    </>
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
