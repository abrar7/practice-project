import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Alert } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import ItemCard from "./ItemCard";
// import { Chip } from "react-native-paper";
import ListItemDeleteAction from "./ListItemDeleteAction";
import ListItemSeparator from "./ListItemSeparator";
import EmptyListMessage from "./EmptyListMessage";
import { Ionicons } from "@expo/vector-icons";
import { items } from "../utils/ItemsData";

// ============================================================

export default function ItemCards() {
  const [refreshing, setRefreshing] = useState(false);
  const [newItems, setNewItems] = useState(items);

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

  return (
    <View style={styles.container}>
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
              imgURL={item?.imgURL}
              onPress={() => console.log("Tapped", item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleAlertAction(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={<ListItemSeparator />} // Divider
          // refreshing={refreshing}
          // onRefresh={() => {
          //   setMessages(newItems);
          // }}
        />
      ) : (
        <EmptyListMessage />
      )}
      <View style={styles.button}>
        <Button status="info">Checkout Rs: 5600</Button>
        <Button
          status="primary"
          accessoryLeft={<Ionicons name="camera" size={20} color="white" />}
        >
          Scan To add
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e4e7ed",
    padding: 15,
  },
});
