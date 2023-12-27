import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Episodios({ navigation }) {
  const [episodies, setEpisodies] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);

  const getEpisodiesData = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/episode");
      const json = await response.json();
      setEpisodies(json.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getEpisodieList = async () => {
    const list = episodies.map((e) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Episodio", { id: e.id })}
        key={e.id}
        style={styles.touch}
      >
        <Text style={styles.episode}>{e.episode}</Text>
        <Text>{e.name}</Text>
        <Text style={styles.fecha}>{e.air_date}</Text>
      </TouchableOpacity>
    ));
    setEpisodeList(list);
  };

  useEffect(() => {
    getEpisodiesData();
  }, []);

  useEffect(() => {
    getEpisodieList();
  }, [episodies]);

  return <ScrollView>{episodeList}</ScrollView>;
}

const styles = new StyleSheet.create({
  touch: {
    padding: 20,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
  },

  episode: {
    color: "#888",
    fontSize: 12
  },
  fecha: {
    color: '#888',
    fontSize: 14
  }
});
