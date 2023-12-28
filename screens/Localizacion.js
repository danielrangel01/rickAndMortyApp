import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function Localizacion({ route }) {

  const { id = 0 } = route.params;
  const [localizacion, setLocalizacion] = useState(null);
  const [peronsajes, setPersonajes] = useState([]);
  const [imgPersonajes, setImgPersonajes] = useState([]);

  const getLocalizacion = async (id) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${id}`
      );
      const json = await response.json();
      setLocalizacion(json);
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
      getLocalizacion(id);
    }
  }, [id]);

  useEffect(() => {
    if (localizacion != null) {
      getPersonajes(localizacion.residents);
    }
  }, [localizacion]);

  return (
    <View>
      {localizacion && (
        <>
          <Text style={styles.title}>
            {localizacion.name}
          </Text>
          <Text style={styles.date}>{localizacion.dimension}</Text>
          <Text style={styles.subTitle}>Pesonajes</Text>
          <ScrollView horizontal>{imgPersonajes}</ScrollView>
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
    letterSpacing: "0.25",
    color: "white",
  },
});
