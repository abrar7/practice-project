import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import { ActivityIndicator } from "react-native-paper";
import { useGetPurchaseHistory } from "../../components/query-hooks/useGetPurchaseHistory";
import { COLORS } from "../../components/utils/COLORS";
import { collection, getDoc, doc } from "firebase/firestore";
import ListItemSeparator from "../../components/cards/ListItemSeparator";
import AppReceiptButton from "../../components/form/AppReceiptButton";
import DeviceSafeArea from "../../components/safe-area/DeviceSafeArea";

// ==================================================

export default function PurchasesList({ navigation }) {
  const currentUserUid = FIREBASE_AUTH?.currentUser?.uid;
  const [historyData, setHistoryData] = useState(null);
  const database = FIRESTORE_DB;
  let customerName;

  const gettingPurchases = async () => {
    const data = await useGetPurchaseHistory(currentUserUid);
    setHistoryData(data?.data);
  };

  const handlePress = async (id) => {
    const filtering = historyData?.filter((v) => v?._id === id);
    const fiterData = filtering[0];
    const userRef = doc(collection(database, "user"), currentUserUid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    customerName = userData?.username;
    navigation.navigate("receipt", {
      data: fiterData,
      customerName: customerName,
    });
  };

  useEffect(() => {
    gettingPurchases();
  }, [currentUserUid]);

  return (
    <>
      <DeviceSafeArea />
      <View style={styles.container}>
        {!historyData ? (
          <View style={styles.noDataView}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.fetchingText}>Fetching...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.heading}>Purchases History</Text>
            {historyData?.length === 0 ? (
              <View style={styles.noRecordView}>
                <Text style={styles.noRecordText}>No Record Found!</Text>
              </View>
            ) : (
              <FlatList
                data={historyData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <AppReceiptButton
                    key={item?._id}
                    buttonText={item?.date}
                    onPress={() => handlePress(item?._id)}
                  />
                )}
                ItemSeparatorComponent={<ListItemSeparator />}
              />
            )}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.bgColor,
  },
  touchableOpacityView: {
    backgroundColor: "#2c2c2d",
    borderRadius: 15,
    marginHorizontal: 7,
    marginVertical: 10,
  },
  text: {
    fontSize: 30,
    padding: 15,
    color: "white",
  },
  noDataView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fetchingText: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
  heading: {
    color: "white",
    fontSize: 35,
    marginBottom: 10,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingVertical: 10,
    backgroundColor: "#2c2c2d",
  },
  noRecordView: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  noRecordText: {
    color: "white",
    fontSize: 32,
  },
});
