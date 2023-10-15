import { useEffect, useState } from "react";
import AddItemForm from "../screens/AddItemForm";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import ConfirmUser from "../screens/ConfirmUser";
import CustomerAction from "../screens/CustomerAction";
import CustomerHomeScreen from "../screens/CustomerHomeScreen";
import ForgotPasswordView from "../screens/ForgotPasswordView";
import GenerateQRCode from "../screens/GenerateQRCode";
import LoginView from "../screens/LoginView";
import ScannerComponent from "../screens/ScannerComponent";
import SignupView from "../screens/SignupView";
import ItemCards from "./cards/ItemCards";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import AppLoader from "../screens/AppLoader";
import { onAuthStateChanged } from "firebase/auth";
import CheckoutPage from "../screens/CheckoutPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StripePayment from "./payment/StripePayment";
import PaymentSuccessfull from "../screens/PaymentSuccessfull";

// ===================================================================

const Stack = createNativeStackNavigator();

// ===================================================================

export default function AppNavigator() {
  const [userRole, setUserRole] = useState();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  async function gettingRole() {
    try {
      const value = await AsyncStorage.getItem("userRole");
      setUserRole(value);
    } catch (e) {
      console.log("errorsss", e.message);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
      if (initializing) {
        setInitializing(false);
      }
    });
    gettingRole();

    return unsubscribe;
  }, []);

  if (initializing) {
    return <AppLoader />;
  }

  return user ? (
    <Stack.Navigator
      initialRouteName={
        userRole === "customer" ? "customerHomeScreen" : "adminHomeScreen"
      }
    >
      <Stack.Screen name="customerHomeScreen" component={CustomerHomeScreen} />
      <Stack.Screen name="adminHomeScreen" component={AdminHomeScreen} />
      <Stack.Screen name="addItemForm" component={AddItemForm} />
      <Stack.Screen name="scannerComponent" component={ScannerComponent} />
      <Stack.Screen name="generateQRCode" component={GenerateQRCode} />
      <Stack.Screen name="checkoutPage" component={CheckoutPage} />
      <Stack.Screen name="itemCards" component={ItemCards} />
      <Stack.Screen name="stripePayment" component={StripePayment} />
      <Stack.Screen name="success" component={PaymentSuccessfull} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="confirmUser">
      <Stack.Screen name="confirmUser" component={ConfirmUser} />
      <Stack.Screen name="customerAction" component={CustomerAction} />
      <Stack.Screen name="signUp" component={SignupView} />
      <Stack.Screen name="login" component={LoginView} />
      <Stack.Screen name="forgotPassword" component={ForgotPasswordView} />
    </Stack.Navigator>
  );
}
