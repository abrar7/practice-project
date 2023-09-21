import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Button } from "@ui-kitten/components";
import { useCreatePaymentIntent } from "../query-hooks/useCreatePaymentIntent";
import { useStripe } from "@stripe/stripe-react-native";

// ========================================================

export default function StripePayment({ grandTotal }) {
  const [amount, setAmount] = useState(200);
  const [loading, setLoading] = useState(false);

  const { mutate, data, error, isLoading } = useCreatePaymentIntent();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // const handleCheckout = async () => {
  //   mutate({ amount });

  //   if (error) {
  //     console.log("Api response error!", error);
  //     return Alert.alert("Api response error!", error.message);
  //   }

  //   const initResponse = await initPaymentSheet({
  //     merchantDisplayName: "Testing mode Name",
  //     paymentIntentClientSecret: data?.clientSecret,
  //   });

  //   if (initResponse.error) {
  //     console.log("Init response error happen!", initResponse.error);
  //     return Alert.alert(
  //       "Init response error happen",
  //       initResponse.error.message
  //     );
  //   }

  //   const paymentResponse = await presentPaymentSheet();

  //   if (paymentResponse.error) {
  //     console.log("Payment Response error happen!", paymentResponse.error);
  //     return Alert.alert(
  //       "Payment Response error happen",
  //       paymentResponse.error.message
  //     );
  //   }
  // };

  useEffect(() => {
    if (data && !error) {
      handlePaymentFlow();
    }
  }, [data, error]);

  const handlePaymentFlow = async () => {
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

      if (paymentResponse.error) {
        console.log("Payment Response error happen!", paymentResponse.error);
        return Alert.alert(
          "Payment Response error happen",
          paymentResponse.error.message
        );
      }
    } catch (err) {
      console.error("An error occurred:", err);
      Alert.alert("An error occurred:", err.message);
    }
  };

  const handleCheckout = () => {
    mutate({ amount });
  };

  return (
    <View style={styles.container}>
      <Text>{data?.clientSecret}</Text>

      <Button size="giant" disabled={loading} onPress={handleCheckout}>
        {!loading ? (
          "Proceed payment"
        ) : (
          <ActivityIndicator size="small" color="white" />
        )}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
  },
});
