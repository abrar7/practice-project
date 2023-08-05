import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { Image, View, StyleSheet } from "react-native";

export default function UploadImage({ setImgURL }) {
  const [image, setImage] = useState(null);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImgURL(result?.assets[0]?.uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        status="primary"
        style={{ marginBottom: 10, borderRadius: 15 }}
        accessoryLeft={<Entypo name="image-inverted" size={20} color="white" />}
        onPress={handlePickImage}
      >
        Upload Item photo
      </Button>

      <View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, borderRadius: 15 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "40%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 15,
  },
});
