import TaskList from "@/components/TaskList";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterButton label="Todos" active={filter === "all"} onPress={() => setFilter("all")} />
        <FilterButton label="Activos" active={filter === "active"} onPress={() => setFilter("active")} />
        <FilterButton label="Completados" active={filter === "completed"} onPress={() => setFilter("completed")} />
      </View>

      <View style={styles.stepContainer}>
        <TaskList filter={filter} />
      </View>
    </View>
  );
}

const FilterButton = ({ label, active, onPress }: { label: string, active: boolean, onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.filterButton, active && styles.filterButtonActive]}
  >
    <Text style={active ? styles.filterTextActive : styles.filterText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  filterButtonActive: {
    backgroundColor: "#4CAF50",
  },
  filterText: {
    color: "#333",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
