import React, { useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { useForm } from "react-hook-form";
import { Button, Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import AppInputField from "../components/form/AppInputField";
import AppCircularProgress from "../components/form/AppCircularProgress";
import FirebaseErrorHandler from "../components/form/FirebaseErrorHandler";
import DevicesToast from "../components/Toast/DevicesToast";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// ==================================================================

export default function ForgotPasswordView({ navigation }) {
  const auth = FIREBASE_AUTH;
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, data?.email);
      DevicesToast("Check your email to reset the password");
      navigation.navigate("confirmUser");
    } catch (error) {
      FirebaseErrorHandler(error);
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DeviceSafeArea />
      <ImageBackground
        source={require("../assets/cart9.jpg")}
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
        </View>
        <View style={styles.textContainer}>
          <Text category="h2" status="control">
            Reset Password
          </Text>
        </View>

        <View style={styles.formContainer}>
          <AppInputField
            name="email"
            placeholder="Enter valid email"
            icon="mail"
            textContentType="emailAddress"
            control={control}
            errors={errors}
          />

          <View style={styles.buttonContainer}>
            <Button
              size="giant"
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
            >
              {!loading ? "Proceed" : <AppCircularProgress color="white" />}
            </Button>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  imageConatiner: {
    display: "flex",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  textContainer: {
    flex: 0.1,
    justifyContent: "center",
    marginLeft: 16,
  },
  formContainer: {
    flex: 0.5,
    paddingHorizontal: 16,
    display: "flex",
  },
  buttonContainer: {
    flex: 0.6,
    marginTop: 30,
  },
});
