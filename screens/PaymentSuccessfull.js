import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@ui-kitten/components";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";
import { AntDesign } from "@expo/vector-icons";
import { collection, doc, getDoc } from "firebase/firestore";
import { COLORS } from "../components/utils/COLORS";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { useGetPurchaseHistory } from "../components/query-hooks/useGetPurchaseHistory";
import { useMutation } from "react-query";
import { useSavePurchase } from "../components/query-hooks/useSavePurchase";
import DevicesToast from "../components/Toast/DevicesToast";

// ======================================

export default function PaymentSuccessfull({ navigation, route }) {
  const { grandTotal, purchasedItems, gstAmount, reward, subTotal } =
    route.params;
  const { mutate: savePurchaseMutation } = useMutation(useSavePurchase);
  const [getReceiptData, setGetReceiptData] = useState(null || undefined);
  const DB = FIRESTORE_DB;
  const currentUserUid = FIREBASE_AUTH?.currentUser?.uid;

  const handleClick = () => {
    navigation.navigate("customerHomeScreen");
  };

  const handleShowReceipt = async () => {
    const userRef = doc(collection(DB, "user"), currentUserUid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const customerName = userData?.username;
    if (customerName && getReceiptData) {
      navigation.navigate("receipt", {
        data: getReceiptData,
        customerName: customerName,
      });
    }
  };

  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const currentDateAndTime = currentDate?.toLocaleDateString("en-US", options);

  const postData = {
    data: {
      userUid: currentUserUid,
      subTotal: subTotal,
      gstAmount: gstAmount,
      reward: reward,
      grandTotal: grandTotal,
      date: currentDateAndTime,
      items: purchasedItems?.map((v) => ({
        companyName: v?.companyName,
        count: v?.count,
        id: v?.id,
        imgLink: v?.imgLink,
        inStock: v?.inStock,
        itemName: v?.itemName,
        price: v?.price,
        weight: v?.weight,
      })),
    },
  };

  const handleSavePurchaseInDb = async () => {
    savePurchaseMutation(postData, {
      onSuccess: async (data) => {
        const historyData = await useGetPurchaseHistory(currentUserUid);
        const fileredData = historyData?.data?.find(
          (v) => v?._id === data?.reponseId
        );
        setGetReceiptData(fileredData);
        DevicesToast("Purchase Completed.");
      },
      onError: (error) => {
        DevicesToast("Post request failed!");
        console.error("Error while post request!", error);
      },
    });
  };

  useEffect(() => {
    handleSavePurchaseInDb();
  }, []);

  return (
    <>
      <DeviceSafeArea />
      <View
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.bgColor,
        }}
      >
        <AntDesign
          name="checkcircle"
          size={100}
          color="white"
          style={{ flex: 0.3 }}
        />
        <Text style={styles.text}>Payment was Successfull</Text>
        <Text style={styles.text}>Thanks for shopping</Text>
        <Text style={styles.text}>Come back soon 😊</Text>
        {getReceiptData && (
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Button
              onPress={handleShowReceipt}
              style={styles.receiptButton}
              size="giant"
            >
              Receipt
            </Button>
            <Button
              size="large"
              status="primary"
              onPress={handleClick}
              style={styles.button}
            >
              Back to Home Screen
            </Button>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontWeight: "700",
    color: "white",
  },
  button: {
    margin: 42,
    borderRadius: 20,
  },
  receiptButton: {
    marginLeft: 30,
    borderRadius: 20,
  },
});
