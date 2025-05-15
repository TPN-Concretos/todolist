import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

type Props = {
  onAdd: (title: string) => void;
};

export default function AddTaskInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Escribe una tarea"
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
      />
      <Button title="Agregar" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
});
