import Checkbox from "expo-checkbox";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ToDo } from "../toDoList/ToDoList";

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
    <View style={styles.container}>
      <Checkbox
        value={toDo.isCompleted}
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
    padding: 8,
    marginHorizontal: 16,
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
