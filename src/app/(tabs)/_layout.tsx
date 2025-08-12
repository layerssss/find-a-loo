import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Toilets",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={28} name="toilet" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="map-pin" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
