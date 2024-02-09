import React from "react";
import { View, StyleSheet, ImageBackground, FlatList } from "react-native";
import { Text, Divider, Button } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import ListItemSeparator from "../components/cards/ListItemSeparator";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// =======================================================

export default function CheckoutPage({ route, navigation }) {
  const { subTotal, weightAge } = route.params;
  const routeArray = {
    subTotal: subTotal,
    weightAge: weightAge,
  };
  const gstAmount = (5 * routeArray.subTotal) / 100;
  const total = routeArray.subTotal + gstAmount;
  const reward = (2 * total) / 100;
  const grandTotal = total - reward;

  const data = [
    {
      id: 1,
      title: "Cart Weight",
      description: "Total weightage of goods",
      price: `${routeArray.weightAge.toFixed(3)} Kg`,
    },
    {
      id: 2,
      title: "Sub Total ",
      description: "Bill of your goods",
      price: `${routeArray.subTotal.toFixed(0)} PKR`,
    },
    {
      id: 3,
      title: "Tax Amount",
      description: "5% GST ",
      price: `${gstAmount.toFixed(1)} PKR`,
    },
    {
      id: 4,
      title: "Reward ",
      description: "Discount from super market",
      price: `${reward.toFixed(0)} PKR`,
    },
    {
      id: 5,
      title: "Total",
      description: "Tolal Payment after reward points",
      price: `${grandTotal.toFixed(0)} PKR`,
    },
  ];

  const handleOnClick = () => {
    navigation.navigate("checkoutQRCode", {
      grandTotal: grandTotal.toFixed(0),
      data: route.params,
      gstAmount: gstAmount,
      reward: reward,
      subTotal: subTotal,
    });
  };

  return (
    <>
      <DeviceSafeArea />
      <ImageBackground
        source={require("../assets/cart9.jpg")}
        resizeMode="cover"
        style={styles.container}
        blurRadius={20}
      >
        <View style={styles.imageConatiner}>
          <Ionicons name="cart" size={74} color="white" />
          <Text category="h4" style={{ color: "white" }}>
            Digicart
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>Checkout Details</Text>
        </View>
        <Divider />
        <View style={styles.flatlist}>
          <FlatList
            data={data}
            keyExtractor={(message) => message?.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.billContainer}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Text style={styles.title}>{item.price}</Text>
              </View>
            )}
            ItemSeparatorComponent={<ListItemSeparator />} // Divider
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button size="giant" onPress={handleOnClick}>
            NEXT
          </Button>
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
  buttonContainer: {
    flex: 0.2,
    marginTop: 30,
  },
  flatlist: {
    padding: 7,
    flex: 0.4,
  },
  heading: {
    color: "white",
    fontSize: 40,
    margin: 5,
  },
  title: {
    color: "white",
    fontSize: 22,
  },
  description: {
    color: "white",
    fontSize: 13,
  },
  billContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
