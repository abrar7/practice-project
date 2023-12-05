import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";

// ===================================================

export default function TestFile() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  button: {
    padding: 20,
    width: "100%",
    height: "20%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  buttonText: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
