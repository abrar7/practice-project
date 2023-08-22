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

// ===================================================================

const Stack = createNativeStackNavigator();

// ===================================================================

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="confirmUser">
      <Stack.Screen
        name="confirmUser"
        component={ConfirmUser}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="customerAction" component={CustomerAction} />
      <Stack.Screen name="login" component={LoginView} />
      <Stack.Screen name="signUp" component={SignupView} />
      <Stack.Screen name="welcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="itemCards" component={ItemCards} />
      <Stack.Screen name="forgotPassword" component={ForgotPasswordView} />
    </Stack.Navigator>
  );
}

export default function App() {
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
    //     {/* <TestFile /> */}
    //     {/* <AddItemForm /> */}
    //     {/* <ConfirmUser /> */}
    //     {/* <EmptyListMessage /> */}
    //     {/* <ItemCard /> */}
    //     {/* <ItemCards /> */}
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
