import { Colors } from "@/constants/Colors";
import { ToDo } from "@/types/ToDo";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { forwardRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

type EntryProps = {
  toDo: ToDo;
  onEdit: (value: string) => void;
  onSubmit: () => void;
  onRemove: (key: string) => void;
  onComplete: (key: string, isCompleted: boolean) => void;
  onFocus: () => void;
};

const Entry = forwardRef<TextInput, EntryProps>(
  ({ toDo, onEdit, onSubmit, onRemove, onComplete, onFocus }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleDeletOnEmpty = (
      e: NativeSyntheticEvent<TextInputKeyPressEventData>
    ) => {
      if (e.nativeEvent.key === "Backspace" && toDo.value === "") {
        onRemove(toDo.key);
      }
    };

    return (
      <View style={styles.container}>
        <Checkbox
          style={styles.checkBox}
          value={toDo.isCompleted}
          color={toDo.isCompleted ? Colors.dark.secondary : Colors.dark.text}
          onValueChange={(isCompleted) => onComplete(toDo.key, isCompleted)}
        />
        <TextInput
          style={[
            styles.input,
            toDo.isCompleted && {
              textDecorationLine: "line-through",
              color: Colors.dark.secondary,
            },
          ]}
          value={toDo.value}
          onChangeText={onEdit}
          onKeyPress={handleDeletOnEmpty}
          blurOnSubmit={false}
          onFocus={() => {
            setIsFocused(true);
            onFocus();
          }}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={onSubmit}
          ref={ref}
        />
        {isFocused && (
          <Feather
            name="x"
            size={24}
            color={Colors.dark.text}
            onPress={() => onRemove(toDo.key)}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderRadius: 16,
  },

  checkBox: {
    height: 28,
    width: 28,
  },

  input: {
    flex: 1,
    padding: 8,
    marginHorizontal: 16,
    fontSize: 18,
    textAlign: "left",
    color: Colors.dark.text,
  },
});

export default Entry;
