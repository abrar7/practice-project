import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ImageBackground } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useCreatePaymentIntent } from "../query-hooks/useCreatePaymentIntent";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useStripe } from "@stripe/stripe-react-native";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import DeviceSafeArea from "../safe-area/DeviceSafeArea";
import DevicesToast from "../Toast/DevicesToast";

// ========================================================

export default function StripePayment({ route, navigation }) {
  const { grandTotal, purchasedItems, gstAmount, reward, subTotal } =
    route.params;
  const [amount, setAmount] = useState(grandTotal);
  const { mutate, data, error } = useCreatePaymentIntent();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const DB = FIRESTORE_DB;

  const manageInventory = async () => {
    for (let i = 0; i < purchasedItems.length; i++) {
      const docRef = doc(collection(DB, "stockItems"), purchasedItems[i].id);
      const itemDoc = await getDoc(docRef);
      const docCountValue = itemDoc.data().inStock;
      updateDoc(docRef, {
        inStock: docCountValue - purchasedItems[i].count,
      });
    }
    setShowNextButton(true);
    DevicesToast("Inventory Updated.");
  };

  useEffect(() => {
    if (paymentSuccessful) {
      manageInventory();
    }
  }, [paymentSuccessful]);

  useEffect(() => {
    if (data && !error) {
      handlePaymentFlow();
    }
  }, [data, error]);

  const handlePaymentFlow = async () => {
    try {
      setLoading(true);
      const initResponse = await initPaymentSheet({
        merchantDisplayName: "Testing mode Name",
        paymentIntentClientSecret: data?.clientSecret,
      });

      if (initResponse.error) {
        console.log("Init response error happen!", initResponse.error);
        return Alert.alert(
          "Init response error happen",
          initResponse.error.message
        );
      }
      setLoading(false);

      const paymentResponse = await presentPaymentSheet();
      setLoading(false);

      if (paymentResponse.error) {
        console.log("Payment Response error happen!", paymentResponse.error);
        return Alert.alert(
          "Payment Response error happen",
          paymentResponse.error.message
        );
      } else {
        setLoading(false);
        setPaymentSuccessful(true);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      Alert.alert("An error occurred:", err.message);
      setPaymentSuccessful(false);
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    mutate({ amount });
  };

  const handleNext = () => {
    navigation.navigate("success", {
      grandTotal,
      purchasedItems,
      gstAmount,
      reward,
      subTotal,
    });
  };

  return (
    <>
      <DeviceSafeArea />
      <ImageBackground
        source={require("../../assets/card4.jpg")}
        resizeMode="cover"
        style={styles.container}
        blurRadius={10}
      >
        <View style={styles.imageConatiner}>
          <Ionicons name="cart" size={74} color="white" />
          <Text category="h4" style={{ color: "white" }}>
            Digicart
          </Text>
          <View style={styles.textContainer}>
            <Text category="h2" status="control">
              Pay here
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Button
            size="giant"
            disabled={loading || paymentSuccessful}
            onPress={handleCheckout}
            style={{ borderRadius: 15 }}
            accessoryLeft={() => (
              <AntDesign
                name="checkcircle"
                size={24}
                color={data?.clientSecret ? "white" : "black"}
              />
            )}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Proceed Payment"
            )}
          </Button>

          <View style={styles.receiptButtonView}>
            {showNextButton && (
              <Button onPress={handleNext} style={styles.button} size="giant">
                Next
              </Button>
            )}
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  imageConatiner: {
    display: "flex",
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    margin: 30,
    borderRadius: 20,
  },
  textContainer: {
    marginTop: 35,
  },
  loadingView: {
    width: "100%",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { fontSize: 22, color: "black", marginTop: 15 },
  receiptButtonView: {
    width: "100%",
    marginTop: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
