import { StyleSheet } from "react-native";
import ToDoList from "./components/toDoList/ToDoList";

export default function App() {
  return <ToDoList />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
