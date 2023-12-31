import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "@ui-kitten/components";
import { BarCodeScanner } from "expo-barcode-scanner";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// ===================================================================

export default function ScannerComponent({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Noting scanned yet!");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const dataObject = JSON.parse(data);
    setText(dataObject?.productName);

    Alert.alert("Message", "Item has been scanned", [
      {
        text: "Add in cart",
        onPress: () => {
          navigation.navigate("itemCards", {
            scannedItem: dataObject.id,
          });
        },
      },
      { text: "Cancel", onPress: () => {} },
    ]);

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // console.log("Type: " + type + "\n Data: " + data);
  };

  // Check permissions and return the screens
  // have no permission
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  // deny case
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <>
      <DeviceSafeArea />
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        </View>

        <Text style={styles.maintext}>Item Name: {text}</Text>

        {scanned && (
          <Button
            size="medium"
            appearance="outline"
            style={styles.button}
            onPress={() => setScanned(false)}
            status="success"
          >
            Scan Again?
          </Button>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#202124",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 22,
    margin: 20,
    color: "white",
  },
  button: {
    margin: 2,
    borderRadius: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});
