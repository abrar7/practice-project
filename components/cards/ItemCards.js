import React, { useState, useEffect } from "react";
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
// import { Chip } from "react-native-paper";
// import { items } from "../utils/ItemsData";

// ============================================================

export default function ItemCards({ route, navigation }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newItems, setNewItems] = useState();
  const database = FIRESTORE_DB;
  // const data = route.params.data;

  const uid = "RXRYmi6jmLH3vbzI0W1O";

  async function getData() {
    const response = await getDocs(
      query(collection(database, "stockItems"), where("id", "==", uid))
    );
    const documentData = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    setIsRefreshing(true);
    setNewItems(documentData);
    setIsRefreshing(false);
  }
  useEffect(() => {
    getData();
  }, []);

  // console.log("newItems", newItems);

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
  };

  const handleScanToAdd = () => {
    navigation.navigate("scannerComponent");
  };

  return (
    // <View style={styles.container}>
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
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <ItemCard
              key={item?.id}
              itemName={item?.itemName}
              companyName={item?.companyName}
              price={item?.price}
              weight={item?.weight}
              image={item?.image}
              imgURL={item?.imgLink}
              onPress={() => console.log("Tapped", item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleAlertAction(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={<ListItemSeparator />} // Divider
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => getData()}
            />
          }
        />
      ) : (
        <EmptyListMessage />
      )}
      <View style={styles.button}>
        <Button status="info">Checkout Rs: 5600</Button>
        <Button
          status="primary"
          onPress={handleScanToAdd}
          accessoryLeft={<Ionicons name="camera" size={20} color="white" />}
        >
          Scan To add
        </Button>
      </View>
    </SafeAreaView>
    // </View>
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
});
