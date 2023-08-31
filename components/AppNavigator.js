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
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../FirebaseConfig";

// ===================================================================

const Stack = createNativeStackNavigator();

// ===================================================================

export default function AppNavigator({ user }) {
  const [userRole, setUserRole] = useState();
  const database = FIRESTORE_DB;

  console.log("user===", user);

  async function getData() {
    const response = await getDocs(
      query(collection(database, "user"), where("id", "==", user.uid))
    );
    const documentData = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    setUserRole(documentData[0].role);
  }

  useEffect(() => {
    getData();
  }, []);

  return user ? (
    <>
      <Stack.Navigator
        initialRouteName={
          userRole === "customer" ? "customerHomeScreen" : "adminHomeScreen"
        }
      >
        <Stack.Screen
          name="customerHomeScreen"
          component={CustomerHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="adminHomeScreen" component={AdminHomeScreen} />
        <Stack.Screen name="addItemForm" component={AddItemForm} />
        <Stack.Screen name="scannerComponent" component={ScannerComponent} />
        <Stack.Screen name="generateQRCode" component={GenerateQRCode} />
        <Stack.Screen
          name="itemCards"
          component={ItemCards}
          options={{ headerShown: false }}
        />
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
