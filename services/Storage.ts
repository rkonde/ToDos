import { ToDo } from "@/types/ToDo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DATA_STORAGE_KEY = "@toDosData";
const TITLE_STORAGE_KEY = "@toDosTitle";

export const getTitle = async () => {
  try {
    const title = await AsyncStorage.getItem(TITLE_STORAGE_KEY);

    return title !== null ? title : "";
  } catch (e) {
    console.error(e);
    return "";
  }
};

export const saveTitle = async (title: string) => {
  try {
    await AsyncStorage.setItem(TITLE_STORAGE_KEY, title);
  } catch (e) {
    console.error(e);
  }
};

export const getToDos = async () => {
  try {
    const jsonToDos = await AsyncStorage.getItem(DATA_STORAGE_KEY);

    if (jsonToDos !== null) {
      const toDos = JSON.parse(jsonToDos);

      return toDos !== undefined ? toDos : [];
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const saveTodos = async (toDos: ToDo[]) => {
  try {
    const jsonToDos = JSON.stringify(toDos);

    await AsyncStorage.setItem(DATA_STORAGE_KEY, jsonToDos);
  } catch (e) {
    console.error(e);
  }
};
