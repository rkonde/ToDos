import React, { useEffect, useRef, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
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

  const handleAddTodo = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setToDos((toDos) => [
      ...toDos,
      { key: Date.now().toString(), value: "", isCompleted: false },
    ]);

    scrollViewRef.current?.scrollToEnd({ animated: true });
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
          toDos.map((toDo) => (
            <Entry
              key={toDo.key}
              toDo={toDo}
              onEdit={(value) => handleValueChange(value, toDo.key)}
              onRemove={handleRemoveToDo}
              onComplete={handleCompleteToDo}
            />
          ))}
        <AddToDoButton onAdd={handleAddTodo} />
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
