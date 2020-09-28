import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeView from "./HomeView";
import HistoryView from "./HistoryView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={HomeView} />
        <Stack.Screen name="History" component={HistoryView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
