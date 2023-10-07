import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  Scrol,
} from "react-native";
import { useForm } from "react-hook-form";
import { Button, Icon, Text } from "@ui-kitten/components";
import AppInputField from "../components/form/AppInputField";
import { doc, setDoc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import UploadImage from "../screens/UploadImage";
import AppCircularProgress from "../components/form/AppCircularProgress";

// ===================================================================

export default function AddItemForm({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [imgURL, setImgURL] = useState();
  const database = FIRESTORE_DB;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemName: "",
      companyName: "",
      weight: "",
      price: "",
      itemsInStock: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const stockCollection = collection(database, "stockItems");
      const response = await addDoc(stockCollection, {
        itemName: data.itemName,
        companyName: data.companyName,
        inStock: Number(data.itemsInStock),
        price: Number(data.price),
        weight: Number(data.weight),
        imgLink: imgURL,
      });
      const uid = response?.id;
      setDoc(
        doc(database, "stockItems", uid),
        {
          id: uid,
        },
        { merge: true }
      );
      alert("Item added in stock");
      navigation.navigate("generateQRCode", {
        id: uid,
        product: data.itemName,
        price: data.price,
      });
      reset();
      setLoading(false);
    } catch (err) {
      alert("Error", err);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/cart5.jpg")}
      resizeMode="stretch"
      style={styles.container}
      blurRadius={20}
    >
      <View style={styles.imageConatiner}>
        {/* <Image
          style={styles.image}
          source={require("../../assets/cartlogo.png")}
        /> */}
        <Ionicons name="cart" size={74} color="white" />
        <Text category="h4" style={{ color: "white" }}>
          Digicart
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text category="h2" status="control">
          Add Item Details
        </Text>
      </View>

      <View style={styles.formContainer}>
        <AppInputField
          name="itemName"
          placeholder="Item Full Name"
          control={control}
          errors={errors}
        />
        <AppInputField
          name="companyName"
          placeholder="Item Company Name"
          control={control}
          errors={errors}
        />

        <AppInputField
          name="weight"
          placeholder="Item Gross Weight"
          keyboardType="numeric"
          control={control}
          errors={errors}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppInputField
            name="price"
            placeholder="Item Price"
            keyboardType="numeric"
            control={control}
            errors={errors}
          />
          <AppInputField
            name="itemsInStock"
            placeholder="Items in Stock"
            keyboardType="numeric"
            control={control}
            errors={errors}
          />
        </View>

        <UploadImage setImgURL={setImgURL} />

        <View style={styles.buttonContainer}>
          <Button
            size="giant"
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {!loading ? (
              "Generate QR Code"
            ) : (
              <AppCircularProgress color="white" />
            )}
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  imageConatiner: {
    display: "flex",
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  scrollView: {
    backgroundColor: "black",
  },
  textContainer: {
    justifyContent: "center",
    marginLeft: 16,
    marginTop: 10,
  },
  formContainer: {
    display: "flex",
    flex: 0.65,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginTop: 14,
  },
});
