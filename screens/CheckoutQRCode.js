import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text } from "@ui-kitten/components";
import {
  addDoc,
  doc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { ActivityIndicator } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import DevicesToast from "../components/Toast/DevicesToast";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// ===================================================================

export default function CheckoutQRCode({ route, navigation }) {
  const { grandTotal, data, gstAmount, reward, subTotal } = route.params;
  const { weightAge, purchasedItems, checkoutScanned } = data;
  const [jsonData, setJsonData] = useState();
  const [responseId, setResponseId] = useState(undefined || "");
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState();
  const database = FIRESTORE_DB;
  const userUid = FIREBASE_AUTH.currentUser.uid;

  const handleGenerateQR = async () => {
    setIsLoading(true);
    try {
      const userRef = doc(collection(database, "checkout"), userUid);
      const collectionRef = collection(userRef, "enableQR");
      const response = await addDoc(collectionRef, {
        userUid: userUid,
        timeStamp: new Date(),
        checkoutScanned: checkoutScanned,
        docId: "",
      });
      setResponseId(response.id);
      const updateRef = doc(
        collection(database, "checkout"),
        userUid,
        "enableQR",
        response.id
      );
      updateDoc(updateRef, {
        docId: response.id,
      });
      const QRData = {
        userUid: userUid,
        docId: response.id,
        timeStamp: new Date(),
        checkoutScanned: checkoutScanned,
      };
      setJsonData(JSON.stringify(QRData));
      DevicesToast("QR Generated Successfully.");
      setIsLoading(false);
    } catch (err) {
      console.error("Error while generating QR code");
      DevicesToast("Error while generating QR code.");
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    const bill = Number(grandTotal);
    navigation.navigate("stripePayment", {
      grandTotal: bill,
      purchasedItems: purchasedItems,
      gstAmount: gstAmount,
      reward: reward,
      subTotal: subTotal,
    });
  };

  useEffect(() => {
    async function settingNextTrue() {
      const dataQuery = query(
        collection(database, "checkout", userUid, "enableQR"),
        where("docId", "==", responseId)
      );
      const querySnapshot = await getDocs(dataQuery);
      const documentData = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      if (documentData[0].checkoutScanned === true) {
        setNext(documentData[0].checkoutScanned);
      }
    }
    if (responseId) {
      settingNextTrue();
    }

    const intervalId = setInterval(settingNextTrue, 7000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [responseId]);

  return (
    <>
      <DeviceSafeArea />
      <ImageBackground
        source={require("../assets/qrcodebg.png")}
        resizeMode="cover"
        style={styles.container}
        blurRadius={20}
      >
        <View style={styles.logoConatiner}>
          <Ionicons name="cart" size={74} color="black" />
          <Text category="h4" style={{ color: "black" }}>
            Digicart
          </Text>
        </View>
        <View style={styles.qrcodeContainer}>
          <Text category="h4" style={styles.text}>
            Kindly go to the checkout point device located in store and scan
            this QR code
          </Text>
          <View style={styles.qrcode}>
            {jsonData && <QRCode value={jsonData} size={300} />}
          </View>
          <View style={styles.detailsContainer}>
            <Text category="h5" style={styles.detailsText}>
              Weightage: {weightAge} kg
            </Text>
            <Text category="h5" style={styles.detailsText}>
              Total bill: Rs.{grandTotal}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            size="giant"
            appearance="filled"
            status="primary"
            onPress={() => navigation.goBack()}
            style={{ borderRadius: 50, width: 110 }}
          >
            Back
          </Button>
          <Button
            size="giant"
            appearance="filled"
            status="info"
            disabled={jsonData?.length > 0}
            onPress={handleGenerateQR}
            style={{ borderRadius: 50, width: 160 }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Generate QR"
            )}
          </Button>
          <Button
            size="giant"
            appearance="filled"
            status="primary"
            disabled={!next}
            onPress={handleNext}
            style={{ borderRadius: 50, width: 110 }}
          >
            Next
          </Button>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  logoConatiner: {
    display: "flex",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  qrcodeContainer: {
    flex: 0.6,
    alignItems: "center",
  },
  qrcode: { margin: 5 },
  text: { color: "black", marginBottom: 25 },
  detailsContainer: { marginTop: 15 },
  detailsText: { color: "black" },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "100%",
    justifyContent: "space-around",
  },
  button: {
    margin: 2,
  },
});
