import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import { StyleSheet, TextInput, View } from "react-native";

import { ToDo } from "@/components/ToDoList";

type EntryProps = {
  toDo: ToDo;
  onAdd: () => void;
  onEdit: (value: string) => void;
  onRemove: (key: string) => void;
  onComplete: (key: string, isCompleted: boolean) => void;
};

const PLACEHOLDER = "Add a new to-do...";

const Entry = ({ toDo, onAdd, onEdit, onRemove, onComplete }: EntryProps) => {
  return (
    <View
      style={[
        styles.container,
        toDo.isCompleted && { backgroundColor: "#57D657" },
      ]}
    >
      <Checkbox
        style={styles.checkBox}
        value={toDo.isCompleted}
        color={"green"}
        onValueChange={(isCompleted) => onComplete(toDo.key, isCompleted)}
      />
      <TextInput
        style={[
          styles.input,
          toDo.isCompleted && { textDecorationLine: "line-through" },
        ]}
        value={toDo.value}
        onChangeText={onEdit}
        onSubmitEditing={onAdd}
        onBlur={onAdd}
        placeholder={PLACEHOLDER}
        blurOnSubmit={false}
      />
      <Ionicons
        name="remove-circle-outline"
        size={28}
        color={"red"}
        onPress={() => onRemove(toDo.key)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
  },

  checkBox: {
    height: 28,
    width: 28,
  },

  input: {
    flex: 1,
    borderColor: "#ddd",
    padding: 8,
    marginHorizontal: 16,
    fontSize: 18,
    textAlign: "left",
  },

  button: {
    borderWidth: 1,
    borderColor: "red",
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
  },

  buttonText: {
    color: "red",
    fontSize: 16,
  },
});

export default Entry;
