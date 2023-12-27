import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Localizaciones({ navigation }) {
  const [localizaciones, setLocalizacione] = useState([]);
  const [localizacionesList, setLocalizacionesList] = useState([]);

  const getLocalizaciones = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/location");
      const json = await response.json();
      setLocalizacione(json.results);
      console.log(json.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocalizacioneList = async () => {
    const list = localizaciones.map((e) => (
      <TouchableOpacity
        onPress={() => {
          try {
            navigation.navigate("Localizacion", { id: e.name });
          } catch (error) {
            console.error("Error al navegar:", error);
          }
        }}
        key={e.id}
        style={styles.touch}
      >
        <Text style={styles.tipo}>{e.type}</Text>
        <Text>{e.name}</Text>
        <Text style={styles.fecha}>{e.dimension}</Text>
      </TouchableOpacity>
    ));
    setLocalizacionesList(list);
  };

  useEffect(() => {
    getLocalizaciones();
  }, []);

  useEffect(() => {
    getLocalizacioneList();
  }, [localizaciones]);

  return <ScrollView>{localizacionesList}</ScrollView>;
}

const styles = new StyleSheet.create({
  touch: {
    padding: 20,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
  },

  episode: {
    color: "#888",
    fontSize: 12,
  },
  fecha: {
    color: "#888",
    fontSize: 14,
  },
});
