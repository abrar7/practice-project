import React from "react";
import { Button, Text } from "@ui-kitten/components";
import { StyleSheet, View, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../components/utils/COLORS";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// ===================================================================

export default function ConfirmUser({ navigation }) {
  const handleCustomer = () => {
    navigation.navigate("customerAction", {
      role: "customer",
    });
  };
  const handleAdmin = () => {
    navigation.navigate("login", {
      role: "admin",
    });
  };
  return (
    <>
      <DeviceSafeArea />
      <ImageBackground
        source={require("../assets/cart3.jpg")}
        resizeMode="cover"
        style={styles.container}
        blurRadius={20}
      >
        <View
          style={{
            width: "100%",
            height: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.imageConatiner}>
            <Ionicons name="cart" size={74} color="white" />
            <Text category="h2" style={{ color: "white" }}>
              Digicart
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              size="giant"
              appearance="filled"
              status="primary"
              onPress={handleAdmin}
              style={{ borderRadius: 50, width: 170 }}
              accessoryLeft={() => (
                <MaterialIcons
                  name="admin-panel-settings"
                  size={22}
                  color={COLORS.lightColor}
                />
              )}
            >
              Admin
            </Button>
            <Button
              size="giant"
              appearance="filled"
              status="primary"
              onPress={handleCustomer}
              style={{ borderRadius: 50, width: 170 }}
              accessoryLeft={() => (
                <MaterialIcons
                  name="person"
                  size={22}
                  color={COLORS.lightColor}
                />
              )}
            >
              Customer
            </Button>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageConatiner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

// {
//   "cli": {
//     "version": ">= 5.4.0"
//   },
//   "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "distribution": "internal"
//     },
//     "production": {}
//   },
//   "submit": {
//     "production": {}
//   }
// }

// "package": "com.abrar7.digicartproject"
