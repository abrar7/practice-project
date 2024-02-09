import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import { Image, View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

// ===================================================================

export default function UploadImage({
  imageUrl,
  openImagePicker,
  pictureLoading,
}) {
  return (
    <View style={styles.container}>
      <Button
        status="primary"
        disabled={pictureLoading}
        style={{ marginBottom: 10, borderRadius: 15 }}
        accessoryLeft={<Entypo name="image-inverted" size={20} color="white" />}
        onPress={openImagePicker}
      >
        Upload Item photo
      </Button>

      <View>
        {pictureLoading ? (
          <View
            style={{
              width: 150,
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 150, height: 150, borderRadius: 15 }}
            />
          )
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
