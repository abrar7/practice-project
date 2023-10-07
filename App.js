import React from "react";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import AppNavigator from "./components/AppNavigator";
import { QueryClient, QueryClientProvider } from "react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // For safe area view in Android

// ======================================

const queryClient = new QueryClient();
const STRIPE_PUBLISH_KEY = "pk_test_PVXNhndw4ri1vxgB1XLWhGc5";

// =====================================

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ApplicationProvider>
      </StripeProvider>
    </QueryClientProvider>

    // <SafeAreaView>
    //   <ApplicationProvider {...eva} theme={eva.light}>
    //     {/* <SignupView /> */}
    //     {/* <LoginView /> */}
    //     {/* <ForgotPasswordView /> */}
    //     {/* <TestFile /> */}
    //     <CheckoutPage />
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
