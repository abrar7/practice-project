import * as eva from "@eva-design/eva";
import { SafeAreaView } from "react-native-safe-area-context"; // For safe area view in Android
import { ApplicationProvider } from "@ui-kitten/components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
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
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import CustomerHomeScreen from "./screens/CustomerHomeScreen";
import AdminHomeScreen from "./screens/AdminHomeScreen";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import AppLoader from "./screens/AppLoader";

// ===================================================================

const Stack = createNativeStackNavigator();

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

  console.log("user====", user);

  function AppNavigator() {
    return user ? (
      <>
        <Stack.Navigator initialRouteName="customerHomeScreen">
          <Stack.Screen
            name="customerHomeScreen"
            component={CustomerHomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="adminHomeScreen" component={AdminHomeScreen} />
          <Stack.Screen
            name="itemCards"
            component={ItemCards}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="addItemForm" component={AddItemForm} />
          <Stack.Screen name="scannerComponent" component={ScannerComponent} />
          <Stack.Screen name="generateQRCode" component={GenerateQRCode} />
        </Stack.Navigator>
      </>
    ) : (
      <>
        <Stack.Navigator initialRouteName="confirmUser">
          <Stack.Screen name="confirmUser" component={ConfirmUser} />
          <Stack.Screen name="customerAction" component={CustomerAction} />
          <Stack.Screen name="signUp" component={SignupView} />
          <Stack.Screen name="login" component={LoginView} />
          <Stack.Screen name="forgotPassword" component={ForgotPasswordView} />
        </Stack.Navigator>
      </>
    );
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <AppNavigator />
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
