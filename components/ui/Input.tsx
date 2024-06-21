import { Colors } from "@/constants/Colors";
import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";

type InputProps = {
  value: string;
  placeholder?: string;
  onEdit: (value: string) => void;
  style?: StyleProp<TextStyle>;
};

const Input = ({ value, placeholder, onEdit, style }: InputProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onEdit}
      placeholder={placeholder}
      placeholderTextColor={Colors.dark.secondary}
      blurOnSubmit={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 4,
    fontSize: 18,
    color: Colors.dark.primary,
  },
});

export default Input;
