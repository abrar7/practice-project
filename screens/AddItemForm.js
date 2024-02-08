import React, { useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { useForm } from "react-hook-form";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Text } from "@ui-kitten/components";
import { doc, setDoc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB, firebaseConfig } from "../FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { initializeApp } from "firebase/app";
import * as ImagePicker from "expo-image-picker";
import AppCircularProgress from "../components/form/AppCircularProgress";
import AppInputField from "../components/form/AppInputField";
import UploadImage from "../screens/UploadImage";
import DevicesToast from "../components/Toast/DevicesToast";
import DeviceSafeArea from "../components/safe-area/DeviceSafeArea";

// ===================================================================

export default function AddItemForm({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const database = FIRESTORE_DB;
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);

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
        imgLink: imageUrl,
        count: 1,
      });
      const uid = response?.id;
      setDoc(
        doc(database, "stockItems", uid),
        {
          id: uid,
        },
        { merge: true }
      );
      DevicesToast("Item added in stock");
      navigation.navigate("generateQRCode", {
        id: uid,
        product: data.itemName,
        price: data.price,
      });
      reset();
      setLoading(false);
    } catch (err) {
      DevicesToast("Error occured, try agin later!");
      console.err(err);
    }
  };

  const openImagePicker = async () => {
    setPictureLoading(true);
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      DevicesToast("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.1,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      await uriToBlob(selectedImage.uri)
        .then((blob) => {
          uploadToFirebase(blob);
        })
        .catch((error) => {
          setPictureLoading(false);
          console.error(error);
        });
    }
  };

  async function uploadToFirebase(blob) {
    try {
      const fileName = `${Date.now()}.jpg`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setImageUrl(downloadURL);
      DevicesToast("Image uploaded successfully");
      setPictureLoading(false);
    } catch (error) {
      setPictureLoading(false);
      console.error(error);
    }
  }
  async function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  }

  return (
    <>
      <DeviceSafeArea />
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

          <UploadImage
            imageUrl={imageUrl}
            openImagePicker={openImagePicker}
            pictureLoading={pictureLoading}
          />

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
    </>
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
