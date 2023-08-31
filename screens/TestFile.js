import React from "react";
import {
  View,
  StyleSheet,
  ToastAndroid,
  Button,
  StatusBar,
} from "react-native";

const TestFile = () => {
  const handleToast = () => {
    ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.LONG);
  };

  return (
    <View style={styles.container}>
      <Button title="Toggle Toast" onPress={() => handleToast()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    padding: 8,
    height: "100%",
    width: "100%",
  },
});

export default TestFile;
