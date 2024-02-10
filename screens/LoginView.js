import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { Button, Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { FIRESTORE_DB } from "../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ActivityIndicator } from "react-native-paper";
import AppInputField from "../components/form/AppInputField";
import FirebaseErrorHandler from "../components/form/FirebaseErrorHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DevicesToast from "../components/Toast/DevicesToast";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// ==================================================================

export default function LoginView({ route, navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const role = route.params.role;
  const auth = FIREBASE_AUTH;
  const database = FIRESTORE_DB;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const getDocsEmail = await getDocs(
        query(collection(database, "user"), where("email", "==", data.email))
      );
      const documentData = getDocsEmail.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      const getDocsRole = documentData[0].role;

      if (getDocsRole === role) {
        await signInWithEmailAndPassword(auth, data?.email, data?.password);
        try {
          await AsyncStorage.setItem("userRole", role);
        } catch (e) {
          console.log("errorsss", e.message);
        }
        if (role === "customer") {
          navigation.navigate("customerHomeScreen");
        } else if (role === "admin") {
          navigation.navigate("adminHomeScreen");
        }
        DevicesToast("Login Successfully");
        setLoading(false);
      } else {
        DevicesToast("Email not authorized to login!");
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      FirebaseErrorHandler(error);
      console.log("error==>", error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (role === "customer") {
      navigation.navigate("forgotPassword");
    } else {
      DevicesToast("Contact to your manager!");
    }
  };

  return (
    <>
      <DeviceSafeArea />
      <ImageBackground
        source={require("../assets/cart2.jpg")}
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
            Login to Digicart
          </Text>
        </View>

        <View style={styles.formContainer}>
          <AppInputField
            name="email"
            placeholder="Email"
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
          <View style={{ display: "flex", alignItems: "flex-end" }}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textDecorationLine: "underline",
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              size="giant"
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
            >
              {!loading ? (
                "LOGIN"
              ) : (
                <ActivityIndicator size="small" color="white" />
              )}
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
