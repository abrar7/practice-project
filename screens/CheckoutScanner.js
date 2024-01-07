import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "@ui-kitten/components";
import { doc, collection, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../FirebaseConfig";
import { BarCodeScanner } from "expo-barcode-scanner";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// ===================================================================

export default function CheckoutScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState();
  const database = FIRESTORE_DB;

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();

    const handleRequest = async () => {
      const dataObject = JSON.parse(scannedData);
      const updateRef = doc(
        collection(database, "checkout"),
        dataObject.userUid,
        "enableQR",
        dataObject.docId
      );
      updateDoc(updateRef, {
        checkoutScanned: true,
      });
    };

    if (scannedData) {
      handleRequest();
    }
  }, [scannedData]);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    Alert.alert("Message", "QR code has been scanned");
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
        <Text
          style={{
            color: "white",
            marginBottom: 20,
            fontSize: 27,
            fontWeight: "bold",
          }}
        >
          Checkout Scanner
        </Text>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        </View>
        {!scannedData && (
          <Text style={styles.maintext}>Nothing scanned yet!</Text>
        )}

        <Text style={styles.maintext}>{scannedData}</Text>

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
