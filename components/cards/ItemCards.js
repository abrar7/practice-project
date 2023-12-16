import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, FlatList, View, Alert } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ItemCard from "./ItemCard";
import ListItemDeleteAction from "./ListItemDeleteAction";
import ListItemSeparator from "./ListItemSeparator";
import EmptyListMessage from "./EmptyListMessage";
import DevicesToast from "../Toast/DevicesToast";
import DeviceSafeArea from "../safe-area/DeviceSafeArea";
import { COLORS } from "../utils/COLORS";

// ============================================================

export default function ItemCards({ route, navigation }) {
  const scannedItemUid = route?.params?.scannedItem || "";
  const [newItems, setNewItems] = useState([]);
  const [checkoutAmount, setCheckoutAmount] = useState();
  const [checkoutWeight, setCheckoutWeight] = useState();
  const isFirstRender = useRef(true);
  const database = FIRESTORE_DB;

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
      "Do you want to delete this item from your cart?",
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
    DevicesToast("Item deleted");
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
    <>
      <DeviceSafeArea />
      <View style={styles.container}>
        <Text
          category="h2"
          style={{
            padding: 10,
            color: "white",
            backgroundColor: "#2c2c2d",
            marginBottom: 3,
          }}
        >
          Scanned Items List
        </Text>
        {newItems?.length ? (
          <FlatList
            data={newItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ItemCard
                key={item?.id}
                item={item}
                handleIncrement={() => handleIncrement(item?.id)}
                handleDecrement={() => handleDecrement(item?.id)}
                renderRightActions={() => (
                  <ListItemDeleteAction
                    onPress={() => handleAlertAction(item)}
                  />
                )}
              />
            )}
            ItemSeparatorComponent={<ListItemSeparator />}
          />
        ) : (
          <EmptyListMessage />
        )}
        <View style={styles.button}>
          <Button
            status="info"
            disabled={newItems.length === 0}
            onPress={handleCheckout}
            style={{ borderRadius: 20 }}
          >
            {`Checkout Rs: ${checkoutAmount}`}{" "}
          </Button>
          <Button
            status="primary"
            onPress={handleScanToAdd}
            style={{ borderRadius: 20 }}
            accessoryLeft={<Ionicons name="camera" size={20} color="white" />}
          >
            Scan To add
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2c2c2d",
    padding: 15,
  },
  checkoutText: {
    fontSize: 43,
    color: "black",
  },
});
