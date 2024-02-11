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
import AppLoader from "../screens/AppLoader";
import CheckoutPage from "../screens/CheckoutPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StripePayment from "./payment/StripePayment";
import PaymentSuccessfull from "../screens/PaymentSuccessfull";
import CheckoutQRCode from "../screens/CheckoutQRCode";
import CheckoutScanner from "../screens/CheckoutScanner";
import Receipt from "../screens/purchase-details/Receipt";
import PurchasesList from "../screens/purchase-details/PurchasesList";
import NoUserRoleFound from "../screens/NoUserRoleFound";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

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
      console.log("errors", e.message);
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
        userRole === "customer"
          ? "customerHomeScreen"
          : userRole === "admin"
          ? "adminHomeScreen"
          : "noUserRoleFound"
      }
    >
      <Stack.Screen
        name="customerHomeScreen"
        component={CustomerHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="purchasesList"
        component={PurchasesList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="receipt"
        component={Receipt}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="adminHomeScreen"
        component={AdminHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="addItemForm"
        component={AddItemForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="scannerComponent"
        component={ScannerComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="generateQRCode"
        component={GenerateQRCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="checkoutPage"
        component={CheckoutPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="checkoutQRCode"
        component={CheckoutQRCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="checkoutScanner"
        component={CheckoutScanner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="itemCards"
        component={ItemCards}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="stripePayment"
        component={StripePayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="success"
        component={PaymentSuccessfull}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="noUserRoleFound"
        component={NoUserRoleFound}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="confirmUser">
      <Stack.Screen
        name="confirmUser"
        component={ConfirmUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="customerAction"
        component={CustomerAction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signUp"
        component={SignupView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={LoginView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPasswordView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
