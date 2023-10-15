import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ImageBackground } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useCreatePaymentIntent } from "../query-hooks/useCreatePaymentIntent";
import { useStripe } from "@stripe/stripe-react-native";
import { ActivityIndicator } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// ========================================================

export default function StripePayment({ route, navigation }) {
  const [amount, setAmount] = useState(route.params.grandTotal);
  const [loading, setLoading] = useState(false);
  const { mutate, data, error, isLoading } = useCreatePaymentIntent();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    if (data && !error) {
      handlePaymentFlow();
    }
  }, [data, error]);

  const handlePaymentFlow = async () => {
    setLoading(true);
    try {
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

      const paymentResponse = await presentPaymentSheet();
      setLoading(false);
      setPaymentSuccessful(true);

      if (paymentResponse.error) {
        console.log("Payment Response error happen!", paymentResponse.error);
        return Alert.alert(
          "Payment Response error happen",
          paymentResponse.error.message
        );
      }
      setLoading(false);
    } catch (err) {
      console.error("An error occurred:", err);
      Alert.alert("An error occurred:", err.message);
    }
    setLoading(false);
  };

  const handleCheckout = () => {
    mutate({ amount });
  };

  const handleFinished = () => {
    navigation.navigate("success");
  };

  return (
    <ImageBackground
      source={require("../../assets/card4.jpg")}
      resizeMode="cover"
      style={styles.container}
      blurRadius={20}
    >
      <View style={styles.imageConatiner}>
        {/* <Image
          style={styles.image}
          source={require("../../assets/cartlogo.png")}
        /> */}
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
          accessoryLeft={
            <FontAwesome
              name="dollar"
              size={24}
              color={data?.clientSecret ? "white" : "red"}
            />
          }
        >
          {!loading ? (
            "Proceed payment"
          ) : (
            <ActivityIndicator size="small" color="white" />
          )}
        </Button>

        {paymentSuccessful && (
          <Button onPress={handleFinished} style={styles.button} size="giant">
            Finished
          </Button>
        )}
      </View>
    </ImageBackground>
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
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    margin: 30,
    borderRadius: 5,
  },
  textContainer: {
    justifyContent: "left",
    marginLeft: 16,
  },
});
