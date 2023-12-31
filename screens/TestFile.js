import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { DataTable, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";
import ListItemSeparator from "../components/cards/ListItemSeparator";

// ===================================================

const items = [
  {
    _id: 1,
    itemName: "Cupcake",
    price: 356,
    weight: 16,
    count: 2,
  },
  {
    _id: 2,
    itemName: "Eclair",
    price: 262,
    weight: 16,
    count: 5,
  },
];

export default function TestFile() {
  return (
    <>
      <DeviceSafeArea />
      <View style={styles.container}>
        <View style={styles.topBarView}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="white"
            style={{ marginRight: 15 }}
          />
          <Text style={styles.receiptText}>Receipt</Text>
        </View>
        <ScrollView>
          <View style={styles.imageConatiner}>
            <Ionicons name="cart" size={74} color="white" />
            <Text style={styles.logoText}>Digicart</Text>
          </View>
          <ListItemSeparator />
          <View style={styles.idView}>
            <Text style={styles.idText}>
              Purchase id: 6595e2fadf178857d1d8b919
            </Text>
          </View>
          <ListItemSeparator />
          <Card style={styles.card}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={styles.customCell}>
                  Item No.
                </DataTable.Title>
                <DataTable.Title textStyle={styles.customCell}>
                  Product
                </DataTable.Title>
                <DataTable.Title numeric textStyle={styles.customCell}>
                  Count
                </DataTable.Title>
                <DataTable.Title numeric textStyle={styles.customCell}>
                  Rupees
                </DataTable.Title>
              </DataTable.Header>

              {items?.map((item) => (
                <DataTable.Row key={item?._id}>
                  <DataTable.Cell textStyle={styles.customCell}>
                    {item?._id}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={styles.customCell}>
                    {item?.itemName}
                  </DataTable.Cell>
                  <DataTable.Cell numeric textStyle={styles.customCell}>
                    {item?.count}
                  </DataTable.Cell>
                  <DataTable.Cell numeric textStyle={styles.customCell}>
                    {item?.price}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card>

          <Card style={styles.card}>
            <View style={styles.cardView}>
              <Text style={styles.total}>Sub Total</Text>
              <Text style={styles.total}>Discount</Text>
              <Text style={styles.total}>Tax Amount</Text>
            </View>
            <View style={styles.cardView}>
              <Text style={styles.total}>570</Text>
              <Text style={styles.total}>15</Text>
              <Text style={styles.total}>20</Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={styles.cardView}>
              <Text style={styles.total}>Total Bill: </Text>
              <Text style={styles.total}>Rs: 804</Text>
            </View>
            <View style={styles.cardView}>
              <Text style={styles.total}>Date: </Text>
              <Text style={styles.total}>8 april, 2017</Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <Text
              style={{
                textAlign: "center",
                width: "100%",
                fontSize: 22,
                color: "white",
                marginBottom: 8,
              }}
            >
              Contact Us:
            </Text>
            <ListItemSeparator />

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                marginVertical: 5,
              }}
            >
              <Entypo
                name="mail"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.total}>digicart@gmail.com</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                marginVertical: 5,
              }}
            >
              <Entypo
                name="phone"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.total}>+92 306 123456</Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#202124", flex: 1 },
  imageConatiner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#2c2c2d",
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 10,
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  customCell: {
    color: "white",
    fontSize: 16,
  },
  total: {
    fontSize: 22,
    color: "white",
  },
  idView: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 7,
    alignItems: "center",
  },
  idText: {
    fontSize: 18,
    color: "white",
    marginVertical: 10,
  },
  logoText: { color: "white", fontSize: 25 },
  receiptText: {
    fontSize: 32,
    color: "white",
  },
  topBarView: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 7,
    alignItems: "center",
  },
});
