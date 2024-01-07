import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { DataTable, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import DeviceSafeArea from "../../components/safe-area/DeviceSafeArea";
import ListItemSeparator from "../../components/cards/ListItemSeparator";

// ===================================================

export default function Receipt({ navigation, route }) {
  const { data, customerName } = route?.params;
  const { _id, date, subTotal, items } = data;

  const newGstAmount = (5 * subTotal) / 100;
  const totalAmount = subTotal + newGstAmount;
  const newReward = (2 * totalAmount) / 100;
  const newGrandTotal = totalAmount - newReward;

  const capitalizedName =
    customerName.charAt(0).toUpperCase() + customerName.slice(1);

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
            onPress={() => navigation.goBack()}
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
            <Text style={styles.idText}>Customer Name: {capitalizedName}</Text>
            <Text style={styles.idText}>Date: {date}</Text>
            <Text style={styles.idText}>MOP: Credit Card</Text>
            <Text style={styles.idText}>Purchase id: {_id}</Text>
          </View>
          <ListItemSeparator />
          <Card style={styles.card}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={styles.customCell}>
                  Item No.
                </DataTable.Title>
                <DataTable.Title textStyle={styles.customCell}>
                  Item
                </DataTable.Title>
                <DataTable.Title numeric textStyle={styles.customCell}>
                  Qty
                </DataTable.Title>
                <DataTable.Title numeric textStyle={styles.customCell}>
                  Rate
                </DataTable.Title>
                <DataTable.Title numeric textStyle={styles.customCell}>
                  Amount
                </DataTable.Title>
              </DataTable.Header>

              {items?.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell textStyle={styles.customCell}>
                    {index + 1}
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
                  <DataTable.Cell numeric textStyle={styles.customCell}>
                    {item?.count * item?.price}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card>

          <Card style={styles.card}>
            <View style={styles.cardView}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.total}>Tax @5.00%</Text>
              <Text style={styles.total}>Discount</Text>
            </View>
            <View style={styles.cardView}>
              <Text style={styles.total}>{subTotal?.toFixed(0)}</Text>
              <Text style={styles.total}>{newGstAmount?.toFixed(1)}</Text>
              <Text style={styles.total}>{newReward?.toFixed(0)}</Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={styles.cardView}>
              <Text style={styles.total}>Grand Total: </Text>
              <Text style={styles.total}>{newGrandTotal?.toFixed(0)} PKR</Text>
            </View>
          </Card>

          <View style={styles.extraSpace}>
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
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202124",
  },
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
    flexDirection: "column",
    marginHorizontal: 10,
    marginTop: 7,
  },
  idText: {
    fontSize: 18,
    color: "white",
    marginVertical: 5,
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
  extraSpace: {
    height: 230,
  },
});
