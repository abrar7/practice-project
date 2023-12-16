import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// ===================================================

export default function AppButton({ title, onPress, icon, micon }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {icon ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              name={icon}
              size={25}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        ) : micon ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name={micon}
              size={25}
              color="white"
              style={{ marginRight: 10 }}
            />

            <Text style={styles.buttonText}>{title}</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  button: {
    padding: 20,
    width: "100%",
    height: "80%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  buttonText: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
