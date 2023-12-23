import { View, Text, Button } from "react-native";
import React from "react";

export default function Episodio() {
  return (
    <View>
      <Text>Episodio</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
