import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Episodios({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Episodio", { name: "Episodio 1972" })}
    >
      <Text>Prueba</Text>
    </TouchableOpacity>
  );
}