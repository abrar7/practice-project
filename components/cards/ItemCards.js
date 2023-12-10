import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Text, Button } from "@ui-kitten/components";
import ItemCard from "./ItemCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import ListItemDeleteAction from "./ListItemDeleteAction";
import ListItemSeparator from "./ListItemSeparator";
import EmptyListMessage from "./EmptyListMessage";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { ToastAndroid } from "react-native";

// ============================================================

export default function ItemCards({ route, navigation }) {
  const scannedItemUid = route?.params?.scannedItem || "";
  const [newItems, setNewItems] = useState([]);
  const [checkoutAmount, setCheckoutAmount] = useState();
  const [checkoutWeight, setCheckoutWeight] = useState();
  const isFirstRender = useRef(true);
  const database = FIRESTORE_DB;
  // const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    async function getData() {
      if (newItems.some((v) => v.id === scannedItemUid)) {
        setNewItems((prev) =>
          prev.map((item) =>
            item.id === scannedItemUid
              ? { ...item, count: item.count + 1 }
              : item
          )
        );
      } else {
        const response = await getDocs(
          query(
            collection(database, "stockItems"),
            where("id", "==", scannedItemUid)
          )
        );
        const documentData = response.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        const scannedDataObj = documentData[0];
        setNewItems((prevData) => [...prevData, scannedDataObj]);
      }
    }

    if (!isFirstRender.current) {
      getData();
    } else {
      isFirstRender.current = false;
    }
  }, [scannedItemUid]);

  const handleAlertAction = (item) => {
    Alert.alert(
      "Confirm Deletion",
      "Do you want to delete this Item from your cart?",
      [
        {
          text: "Yes",
          onPress: () => handleDelete(item),
        },
        { text: "No", onPress: () => {} },
      ]
    );
  };

  const handleDelete = (item) => {
    const filteredData = newItems?.filter((v) => v.id !== item?.id);
    setNewItems(filteredData);
    ToastAndroid.show("Item deleted", ToastAndroid.LONG);
  };

  const handleScanToAdd = () => {
    navigation.navigate("scannerComponent");
  };

  useEffect(() => {
    const makingTotal = () => {
      let totalPrice = 0;
      let weightage = 0;
      for (const item of newItems) {
        totalPrice += item.price * item.count;
        weightage += item.weight * item.count;
      }

      setCheckoutAmount(totalPrice);
      setCheckoutWeight(weightage);
    };
    makingTotal();
  }, [newItems]);

  const handleIncrement = (itemId) => {
    setNewItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, count: item.count + 1 } : item
      )
    );
  };
  const handleDecrement = (itemId) => {
    setNewItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, count: item.count - 1 } : item
      )
    );
  };

  const handleCheckout = () => {
    navigation.navigate("checkoutPage", {
      subTotal: checkoutAmount,
      weightAge: checkoutWeight,
      purchasedItems: newItems,
      checkoutScanned: false,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        category="h2"
        style={{
          padding: 10,
          color: "black",
          backgroundColor: "#e4e7ed",
          marginBottom: 3,
        }}
      >
        Scanned Items List
      </Text>
      {newItems?.length ? (
        <FlatList
          data={newItems}
          keyExtractor={(item, index) => index.toString()}
          // keyExtractor={(message) => message?.id.toString()}
          renderItem={({ item }) => (
            <ItemCard
              key={item?.id}
              item={item}
              handleIncrement={() => handleIncrement(item?.id)}
              handleDecrement={() => handleDecrement(item?.id)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleAlertAction(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={<ListItemSeparator />} // Divider
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isRefreshing}
          //     // onRefresh={() => getData()}
          //     onRefresh={() => newItems}
          //   />
          // }
        />
      ) : (
        <EmptyListMessage />
      )}
      <View style={styles.button}>
        <Button
          status="info"
          disabled={newItems.length === 0}
          onPress={handleCheckout}
        >
          {`Checkout Rs: ${checkoutAmount}`}{" "}
        </Button>

        <Button
          status="primary"
          onPress={handleScanToAdd}
          accessoryLeft={<Ionicons name="camera" size={20} color="white" />}
        >
          Scan To add
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   display: "flex",
  //   height: "100%",
  //   justifyContent: "space-between",
  // },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e4e7ed",
    padding: 15,
  },
  checkoutText: {
    fontSize: 43,
    color: "black",
  },
});
