import { View, Text, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Episodios from "./Episodios";
import Localizaciones from "./Localizaciones";

export default function Home({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "tomato" },
        tabBarLabelStyle: { color: "#FFF"}
      }}
    >
      <Tab.Screen
        name="EPISODIOS"
        children={() => <Episodios navigation={navigation} />}
      />
      <Tab.Screen name="LOCALIZACIONES" component={Localizaciones} />
    </Tab.Navigator>
  );
}
