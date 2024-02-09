import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { Button } from "@ui-kitten/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../utils/COLORS";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

// =======================================================

export default function ItemCard({
  item,
  handleIncrement,
  handleDecrement,
  renderRightActions,
}) {
  const { itemName, price, companyName, weight, imgLink, count } = item;

  return (
    <>
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
          <Card style={styles.cardContainer}>
            <View style={styles.mainContainer}>
              <View style={{ width: "23%" }}>
                <Image style={styles.image} source={{ uri: imgLink }} />
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "77%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    variant="titleLarge"
                    style={{ marginLeft: 5, color: "white" }}
                  >
                    {itemName}
                  </Text>
                  <View
                    style={{
                      marginRight: 7,
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: COLORS.bgColor,
                      paddingLeft: 10,
                      borderRadius: 6,
                    }}
                  >
                    <FontAwesome5
                      name="weight-hanging"
                      size={12}
                      color="white"
                    />
                    <Text style={{ color: "white", marginHorizontal: 10 }}>
                      {weight * count} kg
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 7 }}>
                  <Text
                    variant="titleMedium"
                    style={{ marginLeft: 5, color: "white" }}
                  >
                    {companyName}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: COLORS.bgColor,
                      height: 28,
                      marginLeft: 5,
                      paddingLeft: 10,
                      borderRadius: 6,
                    }}
                  >
                    <Entypo name="price-tag" size={14} color="white" />
                    <Text style={{ color: "white", marginHorizontal: 10 }}>
                      Rs: {price * count}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 6,
                    }}
                  >
                    <Button
                      size="small"
                      status="info"
                      appearance="filled"
                      disabled={count === 1}
                      onPress={handleDecrement}
                      style={{ borderRadius: 50, borderWidth: 1 }}
                      accessoryLeft={<AntDesign name="minuscircle" size={15} />}
                    />
                    <Text variant="titleMedium" style={styles.countStyle}>
                      {count}
                    </Text>

                    <Button
                      size="small"
                      status="info"
                      appearance="filled"
                      disabled={count >= 5}
                      onPress={handleIncrement}
                      style={{ borderRadius: 50, borderWidth: 1 }}
                      accessoryLeft={<AntDesign name="pluscircle" size={15} />}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </Swipeable>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "#2c2c2d",
    borderRadius: 7,
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    margin: 4,
    width: 92,
    height: 92,
    borderRadius: 10,
  },
  countStyle: {
    margin: 6,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    textAlign: "center",
    borderRadius: 5,
    color: "white",
  },
});
