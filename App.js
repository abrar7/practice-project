import React from "react";
import { useEffect, useState } from "react";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import * as eva from "@eva-design/eva";
import { SafeAreaView } from "react-native-safe-area-context"; // For safe area view in Android
import SignupView from "./screens/SignupView";
import LoginView from "./screens/LoginView";
import AddItemForm from "./screens/AddItemForm";
import ConfirmUser from "./screens/ConfirmUser";
import EmptyListMessage from "./components/cards/EmptyListMessage";
import ItemCard from "./components/cards/ItemCard";
import ItemCards from "./components/cards/ItemCards";
import CustomerAction from "./screens/CustomerAction";
import CreditCardView from "./screens/CreditCardView";
import GenerateQRCode from "./screens/GenerateQRCode";
import ScannerComponent from "./screens/ScannerComponent";
import WelcomeScreen from "./screens/WelcomeScreen";
import UploadImage from "./screens/UploadImage";
import AppCircularButton from "./components/form/AppCircularProgress";
import ForgotPasswordView from "./screens/ForgotPasswordView";
import TestFile from "./screens/TestFile";
import CustomerHomeScreen from "./screens/CustomerHomeScreen";
import AdminHomeScreen from "./screens/AdminHomeScreen";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import AppLoader from "./screens/AppLoader";
import AppNavigator from "./components/AppNavigator";

// ===================================================================

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return <AppLoader />;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <AppNavigator user={user} />
      </NavigationContainer>
    </ApplicationProvider>

    // <SafeAreaView>
    //   <ApplicationProvider {...eva} theme={eva.dark}>
    //     {/* <SignupView /> */}
    //     {/* <LoginView /> */}
    //     {/* <ForgotPasswordView /> */}
    //     <TestFile />
    //     {/* <AddItemForm /> */}
    //     {/* <ConfirmUser /> */}
    //     {/* <EmptyListMessage /> */}
    //     {/* <ItemCard /> */}
    //     {/* <ItemCards /> */}
    //     {/* <AdminHomeScreen /> */}
    //     {/* <CustomerAction /> */}
    //     {/* <CreditCardView /> */}
    //     {/* <GenerateQRCode /> */}
    //     {/* <ScannerComponent /> */}
    //     {/* <WelcomeScreen /> */}
    //     {/* <UploadImage /> */}
    //     {/* <AppCircularButton color="black" /> */}
    //   </ApplicationProvider>
    // </SafeAreaView>
  );
}
