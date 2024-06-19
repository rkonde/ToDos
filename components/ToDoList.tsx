import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Entry from "@/components/ui/Entry";
import Input from "@/components/ui/Input";
import { getToDos, saveTodos } from "@/services/Storage";

export type ToDo = {
  key: string;
  value: string;
  isCompleted: boolean;
};

const TodoList = () => {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    loadToDos();
  }, []);

  useEffect(() => {
    saveTodos(toDos);
  }, [toDos]);

  const loadToDos = async () => {
    setToDos(await getToDos());
  };

  const handleAddTodo = () => {
    if (currentValue.trim() !== "") {
      setToDos((toDos) => [
        ...toDos,
        { key: Date.now().toString(), value: currentValue, isCompleted: false },
      ]);

      setCurrentValue("");
    }
  };

  const handleTextChange = (text: string, key: string) => {
    setToDos((toDos) =>
      toDos.map((toDo) => (toDo.key === key ? { ...toDo, value: text } : toDo))
    );
  };

  const handleRemoveToDo = (key: string) => {
    setToDos((toDos) => toDos.filter((toDo) => toDo.key !== key));
  };

  const handleCompleteToDo = (key: string, isCompleted: boolean) => {
    setToDos((toDos) =>
      toDos.map((toDo) => (toDo.key !== key ? toDo : { ...toDo, isCompleted }))
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {toDos.map((toDo) => (
          <Entry
            key={toDo.key}
            toDo={toDo}
            onEdit={(text) => handleTextChange(text, toDo.key)}
            onAdd={handleAddTodo}
            onRemove={handleRemoveToDo}
            onComplete={handleCompleteToDo}
          />
        ))}
        <Input
          value={currentValue}
          onEdit={setCurrentValue}
          onAdd={handleAddTodo}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    flexGrow: 1,
  },
});

export default TodoList;
