import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function Episodio({ route, navigation }) {
  const { id = 0 } = route.params;
  const [episode, setEpisode] = useState(null);
  const [peronsajes, setPersonajes] = useState([]);
  const [imgPersonajes, setImgPersonajes] = useState([]);

  const getEpisode = async (id) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      const json = await response.json();
      setEpisode(json);
      json.characters.forEach((url) => {
        getPersonajes(url);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonaje = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setPersonajes((prevPersonajes) => [...prevPersonajes, json]);
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonajes = async (characters) => {
    characters.forEach((url) => {
      getPersonaje(url);
    });
  };
  

  useEffect(() => {
    if (id != 0) {
      getEpisode(id);
    }
  }, [id]);

  useEffect(() => {
    if (episode != null) {
      getPersonajes(episode.characters);
    }
  }, [episode]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        {episode.episode} : {episode.name}
      </Text>
      <Text>{episode.air_date}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
