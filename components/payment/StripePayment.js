import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ImageBackground } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useCreatePaymentIntent } from "../query-hooks/useCreatePaymentIntent";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useStripe } from "@stripe/stripe-react-native";
import { ActivityIndicator } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { useMutation } from "react-query";
import { useSavePurchase } from "../query-hooks/useSavePurchase";
import DeviceSafeArea from "../safe-area/DeviceSafeArea";
import DevicesToast from "../Toast/DevicesToast";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

// ========================================================

export default function StripePayment({ route, navigation }) {
  const { grandTotal, purchasedItems, gstAmount, reward, subTotal } =
    route.params;
  const [amount, setAmount] = useState(grandTotal);
  const { mutate, data, error } = useCreatePaymentIntent();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const DB = FIRESTORE_DB;
  const { mutate: savePurchaseMutation } = useMutation(useSavePurchase);

  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const currentDateAndTime = currentDate?.toLocaleDateString("en-US", options);

  const postData = {
    data: {
      userUid: FIREBASE_AUTH?.currentUser?.uid,
      subTotal: subTotal,
      gstAmount: gstAmount,
      reward: reward,
      grandTotal: grandTotal,
      date: currentDateAndTime,
      items: purchasedItems?.map((v) => ({
        companyName: v?.companyName,
        count: v?.count,
        id: v?.id,
        imgLink: v?.imgLink,
        inStock: v?.inStock,
        itemName: v?.itemName,
        price: v?.price,
        weight: v?.weight,
      })),
    },
  };

  const handleSavePurchaseInDb = () => {
    savePurchaseMutation(postData, {
      onSuccess: (data) => {
        DevicesToast("Purchase successfull.");
        // here generate receipt button true
      },
      onError: (error) => {
        DevicesToast("Post request failed");
        console.error("Error while post request!", error);
      },
    });
  };

  useEffect(() => {
    const manageInventory = async () => {
      for (let i = 0; i <= purchasedItems.length; i++) {
        const docRef = doc(collection(DB, "stockItems"), purchasedItems[i].id);
        const itemDoc = await getDoc(docRef);
        const docCountValue = itemDoc.data().inStock;
        updateDoc(docRef, {
          inStock: docCountValue - purchasedItems[i].count,
        });
      }
    };
    if (paymentSuccessful) {
      manageInventory();
      handleSavePurchaseInDb();
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

  const handleFinished = () => {
    navigation.navigate("success");
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
            accessoryLeft={
              <FontAwesome
                name="dollar"
                size={24}
                color={data?.clientSecret ? "white" : "red"}
              />
            }
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Proceed Payment"
            )}
          </Button>
          {paymentSuccessful && (
            <Button onPress={handleFinished} style={styles.button} size="giant">
              Finished
            </Button>
          )}
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
    borderRadius: 15,
  },
  textContainer: {
    marginTop: 35,
  },
});
