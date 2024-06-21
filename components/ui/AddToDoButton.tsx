import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";

const TITLE = "Add to do";

type AddToDoButtonProps = {
  onAdd: () => void;
};

const AddToDoButton = ({ onAdd }: AddToDoButtonProps) => {
  return (
    <Pressable style={styles.container} onPress={onAdd}>
      <Entypo
        name="plus"
        size={24}
        color={Colors.dark.text}
        style={styles.icon}
      />
      <Text style={styles.title}>{TITLE}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    gap: 28,
  },

  icon: {
    marginLeft: 2,
  },

  title: {
    color: Colors.dark.text,
    fontSize: 16,
  },
});

export default AddToDoButton;
