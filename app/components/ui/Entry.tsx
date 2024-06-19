import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ToDo } from "../toDoList/ToDoList";

type EntryProps = {
  toDo: ToDo;
  onAdd: () => void;
  onEdit: (value: string) => void;
  onRemove: (key: string) => void;
};

const PLACEHOLDER = "Add a new to-do...";

const Entry = ({ toDo, onAdd, onEdit, onRemove }: EntryProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={toDo.text}
        onChangeText={onEdit}
        onSubmitEditing={onAdd}
        onBlur={onAdd}
        placeholder={PLACEHOLDER}
        blurOnSubmit={false}
      />
      <Pressable style={styles.button} onPress={() => onRemove(toDo.key)}>
        <Text style={styles.buttonText}>X</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "red",
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Entry;
