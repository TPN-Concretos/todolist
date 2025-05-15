import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Platform, StyleSheet, View } from "react-native";
import AddTaskInput from "./AddTaskInput";
import Task from "./Task";

type TaskType = {
  id: string;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = "TASKS";

type TaskListProps = {
  filter: "all" | "active" | "completed";
};

export default function TaskList({ filter }: TaskListProps) {

  const [tasks, setTasks] = useState<TaskType[]>([]);

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });
  
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setTasks(JSON.parse(data));
    });
  }, []);

  // Guardar tareas al cambiar
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    if (Platform.OS === 'web') {
      const confirm = window.confirm("¿Seguro que quieres eliminar esta tarea?");
      if (confirm) {
        setTasks(prev => prev.filter(task => task.id !== id));
      }
      return;
    }
  
    Alert.alert("Eliminar tarea", "¿Seguro que quieres eliminarla?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () =>
          setTasks(prev => prev.filter(task => task.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <AddTaskInput onAdd={addTask} />
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Task
            title={item.title}
            completed={item.completed}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
