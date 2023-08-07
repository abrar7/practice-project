import { View } from "react-native";
import { Input, Text } from "@ui-kitten/components";
import { Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";

// ======================================================

export default function AppInputField({
  name,
  placeholder,
  icon,
  control,
  keyboardType,
  secureTextEntry,
  maxLength,
  onPressIcon,
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
            secureTextEntry={secureTextEntry}
            size="large"
            status="control"
            style={style}
            value={value}
            maxLength={maxLength}
            onChangeText={onChange}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize="none"
            textStyle={{ fontSize: 22, paddingVertical: 3 }}
            accessoryRight={
              <MaterialIcons
                name={icon}
                size={24}
                color="black"
                onPress={onPressIcon}
              />
            }
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
