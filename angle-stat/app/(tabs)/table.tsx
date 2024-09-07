import { StyleSheet, Image, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import * as Location from "expo-location";
import { useEffect, useState } from "react";

import * as Sensors from "expo-sensors";

export default function TabTwoScreen() {
  const gpxCreate = () => {
    console.log("create .gpx");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#87CEEB", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/moto.png")}
          style={styles.mdLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">GPS track info</ThemedText>
      </ThemedView>
      <Button title="Create .gpx file" onPress={() => gpxCreate()}></Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  mdLogo: {
    maxHeight: 178,
    maxWidth: 178,
    bottom: 0,
    left: 40,
    position: "absolute",
  },
});
