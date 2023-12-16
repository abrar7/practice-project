import React, { useState, useEffect } from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/form/AppButton";
import { ActivityIndicator } from "react-native-paper";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// =====================================================

export default function AdminHomeScreen({ navigation }) {
  const [userName, setUserName] = useState();
  const database = FIRESTORE_DB;

  const handleLogout = async () => {
    FIREBASE_AUTH.signOut();
    try {
      await AsyncStorage.removeItem("userRole");
    } catch (e) {
      console.log("errors", e.message);
    }
  };

  const handleAddItems = () => {
    navigation.navigate("addItemForm");
  };

  useEffect(() => {
    const currentUserUid = FIREBASE_AUTH.currentUser.uid;
    const userName = async () => {
      const userRef = doc(collection(database, "user"), currentUserUid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      setUserName(userData?.username);
    };
    userName();
  }, []);

  return !userName ? (
    <View style={styles.loader}>
      <ActivityIndicator
        size="large"
        color="black"
        style={{ marginBottom: 10 }}
      />
      <Text>Loading...</Text>
    </View>
  ) : (
    <>
      <DeviceSafeArea />
      <SafeAreaView style={styles.container}>
        <View style={styles.imageConatiner}>
          <Ionicons name="cart" size={74} color="white" />
          <Text category="h4" style={{ color: "white" }}>
            Digicart
          </Text>
        </View>
        <View>
          <Text style={styles.welcome}>Welcome Admin {userName}</Text>
        </View>

        <AppButton
          title="Update Inventory"
          onPress={handleAddItems}
          micon="inventory"
        />
        <AppButton
          title="Checkout Scanner"
          onPress={() => navigation.navigate("checkoutScanner")}
          micon="qr-code-scanner"
        />
        <AppButton title="Logout" onPress={handleLogout} icon="logout" />
      </SafeAreaView>
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
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    margin: 20,
  },
  welcome: {
    color: "white",
    fontSize: 32,
    marginBottom: 10,
    marginTop: 10,
  },
  loader: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
