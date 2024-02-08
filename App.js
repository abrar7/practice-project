import React from "react";
import * as eva from "@eva-design/eva";
import AppNavigator from "./components/AppNavigator";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_KEY } from "./components/utils/encapsulate";

// ======================================

const queryClient = new QueryClient();
const STRIPE_PUBLISH_KEY = STRIPE_KEY;

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
  );
}
