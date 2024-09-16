import { StyleSheet, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useGetWeatherQuery } from "@/services/openWeatherApi";

export default function TabTwoScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      console.log("location=", location);
    })();
  }, []);

  const { data, error, isLoading } = useGetWeatherQuery(
    {
      lat: location!.coords.latitude,
      lon: location!.coords.longitude,
    },
    { skip: !location },
  );

  useEffect(() => {
    if (data) console.log("data=", data);
    console.log("w error=", error);
  }, [data, error]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#F5DEB3", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/moto.png")}
          style={styles.mdLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Motodream</ThemedText>
      </ThemedView>
      <ThemedText type="subtitle">Location:</ThemedText>
      {!location && <ThemedText>Waiting..</ThemedText>}
      {location &&
        Object.entries(location.coords).map((el) => (
          <ThemedText key={el[0]}>
            {el[0].toString() + ": " + el[1]?.toString()}
          </ThemedText>
        ))}
      {errorMsg && <ThemedText></ThemedText>}
      <ThemedText type="subtitle">Weather:</ThemedText>
      {isLoading && <ThemedText>Loading...</ThemedText>}
      {error && <ThemedText>Weather Error</ThemedText>}
      {data && (
        <ThemedText>{`${data.name}: ${data.weather[0].description}`}</ThemedText>
      )}
      {data && <ThemedText>Temp: {data.main.temp.toString()}</ThemedText>}
      {data && (
        <ThemedText>Feels like: {data.main.feels_like.toString()}</ThemedText>
      )}
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
