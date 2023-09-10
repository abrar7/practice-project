import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Button } from "@ui-kitten/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

// =======================================================

export default function ItemCard({
  itemName,
  companyName,
  price,
  weight,
  imgURL,
  renderRightActions,
  setCount,
  count,
}) {
  // const [count, setCount] = useState(1);
  const [itemPrice, setItemPrice] = useState(price);

  const handleIncrement = () => {
    setCount(count + 1);
    setItemPrice(itemPrice + price);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setItemPrice(itemPrice - price);
    }
  };

  return (
    <>
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
          <Card style={styles.cardContainer}>
            <View style={styles.mainContainer}>
              <View style={{ width: "23%" }}>
                <Image style={styles.image} source={{ uri: imgURL }} />
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
                    style={{ marginLeft: 5, color: "black" }}
                  >
                    {itemName}
                  </Text>

                  <Chip
                    icon="weight"
                    style={{
                      width: "28%",
                      height: "100%",
                      marginRight: 6,
                    }}
                  >
                    {weight * count} kg
                  </Chip>
                </View>
                <View>
                  <Text variant="titleMedium" style={{ marginLeft: 5 }}>
                    {companyName}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    variant="titleMedium"
                    style={{
                      paddingHorizontal: 4,
                      marginVertical: 10,
                    }}
                  >
                    <Chip icon="information">Rs: {itemPrice}</Chip>
                  </Text>
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
                    <Text
                      variant="titleMedium"
                      style={{
                        margin: 6,
                        borderWidth: 1,
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        textAlign: "center",
                        borderRadius: 5,
                      }}
                    >
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
    backgroundColor: "#f5f6fa",
    borderRadius: 15,
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
    // height: 92,
    height: 92,
    borderRadius: 10,
  },
});
