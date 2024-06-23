import React, { useEffect, useRef, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  UIManager,
  View,
} from "react-native";

import AddToDoButton from "@/components/ui/AddToDoButton";
import Entry from "@/components/ui/Entry";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/Colors";
import { getTitle, getToDos, saveTitle, saveTodos } from "@/services/Storage";
import { ToDo } from "@/types/ToDo";

const TITLE_PLACEHOLDER = "Title";

const EMPTY_TO_DO: ToDo = {
  key: Date.now().toString(),
  value: "",
  isCompleted: false,
};

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [toDos, setToDos] = useState<ToDo[]>([EMPTY_TO_DO]);
  const inputRefs = useRef<TextInput[]>([]);
  const [focusedInputIndex, setFocusedInputIndex] = useState<number>(0);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (toDos && toDos.length > 0) {
      saveTodos(toDos);
    }

    if (focusedInputIndex !== null && inputRefs.current[focusedInputIndex]) {
      inputRefs.current[focusedInputIndex].focus();
    }

    if (focusedInputIndex === toDos.length - 1) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [toDos]);

  useEffect(() => {
    if (title !== "") {
      saveTitle(title);
    }
  }, [title]);

  const loadData = async () => {
    setToDos(await getToDos());
    setTitle(await getTitle());
  };

  const handleAddTodo = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setToDos((toDos) => {
      const updatedToDos = [...toDos];

      updatedToDos.splice(index + 1, 0, {
        key: Date.now().toString(),
        value: "",
        isCompleted: false,
      });

      return updatedToDos;
    });

    setFocusedInputIndex(index + 1);
  };

  const handleValueChange = (value: string, key: string) => {
    setToDos((toDos) =>
      toDos.map((toDo) => (toDo.key === key ? { ...toDo, value: value } : toDo))
    );
  };

  const handleCompleteToDo = (key: string, isCompleted: boolean) => {
    setToDos((toDos) =>
      toDos.map((toDo) => (toDo.key !== key ? toDo : { ...toDo, isCompleted }))
    );
  };

  const handleRemoveToDo = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setToDos((toDos) => {
      const filteredToDos = toDos.filter((toDo) => toDo.key !== key);

      if (filteredToDos.length === 0) {
        filteredToDos.push(EMPTY_TO_DO);
      }

      return filteredToDos;
    });

    setFocusedInputIndex((focusedInputIndex) => focusedInputIndex - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" ref={scrollViewRef}>
        <View style={styles.titleContainer}>
          <Input
            value={title}
            placeholder={TITLE_PLACEHOLDER}
            onEdit={setTitle}
            style={styles.title}
          />
        </View>
        {toDos &&
          toDos.map((toDo, index) => (
            <Entry
              key={toDo.key}
              toDo={toDo}
              ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
              onEdit={(value) => handleValueChange(value, toDo.key)}
              onSubmit={() => handleAddTodo(index)}
              onRemove={handleRemoveToDo}
              onComplete={handleCompleteToDo}
              onFocus={() => setFocusedInputIndex(index)}
            />
          ))}
        <AddToDoButton onAdd={() => handleAddTodo(toDos.length - 1)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.dark.background,
  },

  titleContainer: {
    marginVertical: 12,
  },

  title: {
    fontSize: 24,
  },
});

export default TodoList;
