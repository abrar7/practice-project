import React from "react";
import { Button, Icon, Text } from "@ui-kitten/components";
import { StyleSheet, View, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function CustomerAction({ navigation }) {
  const handleSignUp = () => {
    navigation.navigate("signUp");
    // console.log("Admin pressed");
  };
  const handleLogin = () => {
    navigation.navigate("login");
    // console.log("Customer pressed");
  };
  return (
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
            onPress={handleSignUp}
            style={{ borderRadius: 50, width: 170 }}
            accessoryLeft={
              <MaterialIcons name="app-registration" size={22} color="white" />
            }
          >
            SIGN UP
          </Button>
          <Button
            size="giant"
            appearance="filled"
            status="primary"
            onPress={handleLogin}
            style={{ borderRadius: 50, width: 170 }}
            accessoryLeft={
              <MaterialIcons name="login" size={22} color="white" />
            }
          >
            LOGIN
          </Button>
        </View>
      </View>
    </ImageBackground>
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
