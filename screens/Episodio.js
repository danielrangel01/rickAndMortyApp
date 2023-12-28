import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function Episodio({ route }) {
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
      const imagen = (
        <View key={json.id} style={{ flexDirection: "column", width: 60 }}>
          <Image
            source={{ uri: json.image }}
            style={{ width: 50, height: 50, borderRadius: 50, margin: 5 }}
          />
          <Text style={{ fontSize: 8, textAlign: "center", margin: 5 }}>
            {json.name}
          </Text>
        </View>
      );

      setImgPersonajes((prevImagen) => [...prevImagen, imagen]);
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
    <View>
      {episode && (
        <>
          <Text style={styles.title}>
            {episode.episode} : {episode.name}
          </Text>
          <Text style={styles.date}>{episode.air_date}</Text>
          <Text style={styles.subTitle}>Pesonajes</Text>
          <ScrollView horizontal>{imgPersonajes}</ScrollView>
          <Text style={styles.subTitle}>Comentarios</Text>
          <TextInput placeholder="Tu nombre" style={styles.inputSingle} />
          <TextInput
            placeholder="Correo Electronico"
            style={styles.inputSingle}
          />
          <TextInput
            placeholder="Comentario (max 500 caracteres)"
            multiline
            style={styles.inputMultiline}
          />
          <View style={styles.contentButton}>
            <Pressable title="Enviar" style={styles.button}>
              <Text style={styles.buttonText}>Enviar</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingStart: 10,
    paddingTop: 10,
  },

  date: {
    color: "#888",
    padding: 10,
  },

  subTitle: {
    padding: 10,
    fontSize: 18,
  },

  inputSingle: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    color: "#000",
  },

  inputMultiline: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    height: 200,
    textAlignVertical: "top",
    color: "#000",
  },
  contentButton: {
    paddingTop: 50,
    alignItems: "center",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#55F",
    width: 150,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
});
