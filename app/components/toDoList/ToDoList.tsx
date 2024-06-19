import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Entry from "../ui/Entry";
import Input from "../ui/Input";

const STORAGE_KEY = "@todos";

export type ToDo = { key: string; text: string };

const TodoList = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const loadTodos = async () => {
    try {
      const jsonToDos = await AsyncStorage.getItem(STORAGE_KEY);

      if (jsonToDos != null) {
        setTodos(JSON.parse(jsonToDos));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveTodos = async (todos: ToDo[]) => {
    try {
      const jsonToDos = JSON.stringify(todos);

      await AsyncStorage.setItem(STORAGE_KEY, jsonToDos);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddTodo = () => {
    if (currentValue.trim() !== "") {
      setTodos([...todos, { key: Date.now().toString(), text: currentValue }]);

      setCurrentValue("");
    }
  };

  const handleTextChange = (text: string, key: string) => {
    setTodos((toDos) =>
      toDos.map((todo) => (todo.key === key ? { ...todo, text } : todo))
    );
  };

  const handleRemoveToDo = (key: string) => {
    setTodos((todos) => todos.filter((todo) => todo.key !== key));
  };

  const renderTodo = (item: ToDo) => (
    <Entry
      key={item.key}
      toDo={item}
      onEdit={(text) => handleTextChange(text, item.key)}
      onAdd={handleAddTodo}
      onRemove={handleRemoveToDo}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {todos.map(renderTodo)}
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
