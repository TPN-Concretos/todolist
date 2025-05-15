import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

type TaskProps = {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const Task = ({ title, completed, onToggle, onDelete }: TaskProps) => (
  <View style={[styles.taskContainer, completed && styles.completedTask]}>
    <Switch
      value={completed}
      onValueChange={onToggle}
      thumbColor={completed ? "#4CAF50" : "#f4f3f4"}
      trackColor={{ false: "#ccc", true: "#81C784" }}
    />
    <Text style={[styles.taskText, completed && styles.taskTextCompleted]}>
      {title}
    </Text>
    <TouchableOpacity onPress={onDelete}>
      <Ionicons name="trash-outline" size={20} color="#d33" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#eeeeee",
    padding: 12,
    borderRadius: 12,
    shadowOpacity: 0.1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  completedTask: {
    backgroundColor: "#e0f7e9",
  },
  taskText: {
    fontSize: 18,
    color: "#333",
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});

export default Task;