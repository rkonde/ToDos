import { StyleSheet, TextInput } from "react-native";

type InputProps = {
  value: string;
  onEdit: (value: string) => void;
  onAdd: () => void;
};

const PLACEHOLDER = "Add a new to-do...";

const Input = ({ value, onAdd, onEdit }: InputProps) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onEdit}
      onSubmitEditing={onAdd}
      onBlur={onAdd}
      placeholder={PLACEHOLDER}
      blurOnSubmit={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Input;
