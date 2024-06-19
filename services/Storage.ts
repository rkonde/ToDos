import { ToDo } from "@/components/ToDoList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDos";

export const getToDos = async () => {
  try {
    const jsonToDos = await AsyncStorage.getItem(STORAGE_KEY);

    if (jsonToDos != null) {
      return JSON.parse(jsonToDos);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const saveTodos = async (toDos: ToDo[]) => {
  try {
    const jsonToDos = JSON.stringify(toDos);

    await AsyncStorage.setItem(STORAGE_KEY, jsonToDos);
  } catch (e) {
    console.error(e);
  }
};
