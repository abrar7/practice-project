import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { useForm } from "react-hook-form";
import { Button, Icon, Text } from "@ui-kitten/components";
import AppInputField from "../components/form/AppInputField";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../FirebaseConfig";
import { ActivityIndicator } from "react-native-paper";
import FirebaseErrorHandler from "../components/form/FirebaseErrorHandler";
import DevicesToast from "../components/Toast/DevicesToast";

// =====================================================

export default function SignupView({ navigation }) {
  const auth = FIREBASE_AUTH;
  const database = FIRESTORE_DB;
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      const uid = response?.user.uid;
      setDoc(
        doc(database, "user", uid),
        {
          username: data?.name,
          email: response?.user.email,
          role: "customer",
          id: uid,
        },
        { merge: true }
      );
      DevicesToast("Signed in successfully");
      navigation.navigate("login");
    } catch (error) {
      FirebaseErrorHandler(error);
      console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/cart10.jpg")}
      resizeMode="stretch"
      style={styles.container}
      blurRadius={20}
    >
      <View style={styles.imageConatiner}>
        <Ionicons name="cart" size={74} color="white" />
        <Text category="h4" style={{ color: "white" }}>
          Digicart
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text category="h2" status="control">
          Sign Up to Digicart
        </Text>
      </View>

      <View style={styles.formContainer}>
        <AppInputField
          name="name"
          placeholder="Full Name"
          icon="person"
          control={control}
          errors={errors}
        />
        <AppInputField
          name="email"
          placeholder="Valid Email"
          icon="mail"
          control={control}
          errors={errors}
        />
        <AppInputField
          name="password"
          placeholder="Password"
          secureTextEntry={passwordVisible ? false : true}
          icon="visibility"
          onPressIcon={() => setPasswordVisible(!passwordVisible)}
          control={control}
          errors={errors}
        />

        <View style={styles.buttonContainer}>
          <Button
            size="giant"
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {!loading ? (
              "SIGN UP"
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </Button>
        </View>
      </View>
    </ImageBackground>
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
