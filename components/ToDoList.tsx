import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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

  const handleCompleteToDo = (key: string, isCompleted: boolean) => {
    setToDos((toDos) =>
      toDos.map((toDo) => (toDo.key !== key ? toDo : { ...toDo, isCompleted }))
    );
  };

  const handleRemoveToDo = (key: string) => {
    setToDos((toDos) => toDos.filter((toDo) => toDo.key !== key));
  };

  const handleCompleteAll = () => {
    setToDos((toDos) => toDos.map((toDo) => ({ ...toDo, isCompleted: true })));
  };

  const handleRemoveAll = () => {
    setToDos([]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
      <View style={styles.bottomBar}>
        <Pressable style={styles.button} onPress={handleCompleteAll}>
          <Text style={styles.buttonText}>Complete All</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.redButton]}
          onPress={handleRemoveAll}
        >
          <Text style={styles.buttonText}>Remove All</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  bottomBar: {
    flexDirection: "row",
  },

  button: {
    flex: 1,
    padding: 8,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    borderRadius: 8,
  },

  redButton: {
    backgroundColor: "red",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TodoList;
