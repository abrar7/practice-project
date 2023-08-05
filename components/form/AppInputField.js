import { View } from "react-native";
import { Input, Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

export default function AppInputField({
  name,
  placeholder,
  icon,
  control,
  keyboardType,
  maxLength,
  style,
  errors,
}) {
  return (
    <View style={{ marginVertical: 5 }}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            size="large"
            status="control"
            style={style}
            value={value}
            maxLength={maxLength}
            onChangeText={onChange}
            placeholder={placeholder}
            keyboardType={keyboardType}
            textStyle={{ fontSize: 22, paddingVertical: 3 }}
            accessoryRight={<Ionicons name={icon} size={24} color="black" />}
          />
        )}
      />
      {errors?.[name] && (
        <Text status="control" style={{ fontWeight: 600, marginLeft: 2 }}>
          {name} required
        </Text>
      )}
    </View>
  );
}
