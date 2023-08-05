import React, { useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { useForm } from "react-hook-form";
import { Button, Icon, Text } from "@ui-kitten/components";
import AppInputField from "../components/form/AppInputField";
import { Ionicons } from "@expo/vector-icons";
import UploadImage from "../screens/UploadImage";

export default function AddItemForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [imgURL, setImgURL] = useState();

  const {
    control,
    handleSubmit,
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
    // navigation.navigate("login");

    console.log("formData", data);
    console.log("image Url", imgURL);
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

        <UploadImage setImgURL={setImgURL} />

        <View style={styles.buttonContainer}>
          <Button size="giant" onPress={handleSubmit(onSubmit)}>
            Generate QR Code
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
    // backgroundColor: "black",
    flex: 0.13,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  textContainer: {
    flex: 0.1,
    justifyContent: "center",
    marginLeft: 16,
  },
  formContainer: {
    flex: 0.5,
    paddingHorizontal: 16,
    display: "flex",
  },
  buttonContainer: {
    flex: 0.6,
    marginTop: 30,
  },
});

// Sign Up done

// const renderPasswordIcon = (props) => (
//   <TouchableWithoutFeedback
//     onPress={() => setPasswordVisible(!passwordVisible)}
//   >
//     <Icon {...props} name={passwordVisible ? "eye-off" : "eye"} />
//   </TouchableWithoutFeedback>
// );
