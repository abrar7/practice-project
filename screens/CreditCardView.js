import React from "react";
import { useForm } from "react-hook-form";
import AppInputField from "../components/form/AppInputField";
import { Button, Text } from "@ui-kitten/components";
import { StyleSheet, View, ImageBackground } from "react-native";

// ========================================================

export default function CreditCardView() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: "",
      expiry: "",
      name: "",
      cvv: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <ImageBackground
      source={require("../assets/card1.jpg")}
      resizeMode="cover"
      blurRadius={20}
      style={styles.pageContainer}
    >
      <View style={styles.container}>
        <View style={{ marginBottom: 15 }}>
          <Text category="h2" status="control">
            Card Details
          </Text>
        </View>

        <AppInputField
          name="name"
          placeholder="Card Holder Name"
          control={control}
          errors={errors}
        />
        <AppInputField
          name="cardNumber"
          placeholder="Card Number"
          maxLength={19}
          keyboardType="numeric"
          control={control}
          errors={errors}
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <AppInputField
            name="expiry"
            placeholder="Expiry Date"
            keyboardType="numeric"
            control={control}
            errors={errors}
          />
          <View style={{ marginLeft: 15 }}>
            <AppInputField
              name="cvv"
              placeholder="CVV"
              maxLength={4}
              keyboardType="numeric"
              control={control}
              errors={errors}
            />
          </View>
        </View>

        <Button
          size="large"
          style={{ marginTop: 14 }}
          onPress={handleSubmit(onSubmit)}
        >
          Proceed
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "brown",
  },
  container: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#1d1916",
  },
});
