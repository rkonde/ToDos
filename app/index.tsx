import ToDoList from "@/components/ToDoList";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.dark.background}
        barStyle={"dark-content"}
      />
      <ToDoList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
