import { StyleSheet, Image, Linking, Pressable, Alert } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import { useEffect, useState } from "react";
import { useGetWeatherQuery } from "@/services/openWeatherApi";

export default function TabTwoScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isLocationDetails, setIsLocationDetails] = useState<boolean>(false);

  const [isTracking, setIsTracking] = useState<boolean>(false);

  const [track, setTrack] = useState<Location.LocationObject[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);

      console.log("location=", location);
    })();
  }, []);

  TaskManager.defineTask(
    "track-record",
    ({
      data,
      error,
    }: {
      data: {
        locations: Location.LocationObject[];
      };
      error: TaskManager.TaskManagerError | null;
    }) => {
      if (error) {
        console.log("Task error", error);
        return;
      }

      if (data && data.locations && data.locations.length > 0) {
        console.log("Received new locations", data.locations);
        setTrack((prevTrack) => [...prevTrack, data.locations[0]]);
      }
    }
  );

  const startTracking = async () => {
    console.log("start record");

    try {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.startLocationUpdatesAsync("track-record", {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1,
        timeInterval: 1000,
      });
      setIsTracking(true);
      Alert.alert("Location updates started!");
    } catch (err) {
      console.log(err);

      setErrorMsg("Permission to access location was denied");
    }
  };

  const stopTracking = async () => {
    await Location.stopLocationUpdatesAsync("track-record");
    setIsTracking(false);
  };

  const { data, error, isLoading } = useGetWeatherQuery(
    location
      ? {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        }
      : { lat: 0, lon: 0 },
    { skip: !location }
  );

  // useEffect(() => {
  //   if (data) console.log("data=", data);
  //   if (error) console.log("w error=", error);
  // }, [data, error]);

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
      {location && (
        <>
          {isLocationDetails &&
            Object.entries(location.coords).map((el) => (
              <ThemedText key={el[0]}>
                {el[0].toString() + ": " + el[1]?.toString()}
              </ThemedText>
            ))}
          {!isLocationDetails && (
            <ThemedView style={styles.gpsSection}>
              <ThemedView style={styles.gpsBlock}>
                <ThemedText>{`Lon: ${location.coords.longitude}`}</ThemedText>
                <ThemedText>{`Lat: ${location.coords.latitude}`}</ThemedText>
                <ThemedText>{`Alt: ${location.coords.altitude?.toFixed(2)}`}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.gpsBlock}>
                <ThemedText>{`Accuracy: ${location.coords.accuracy?.toFixed(2)}`}</ThemedText>
                <ThemedText>{`Speed: ${location.coords.speed}`}</ThemedText>
              </ThemedView>
            </ThemedView>
          )}
          <Pressable
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/?q=${location.coords.latitude},${location.coords.longitude}`
              )
            }
          >
            <ThemedText type="link">Open google maps</ThemedText>
          </Pressable>
          <Pressable
            onPress={() =>
              setIsLocationDetails(isLocationDetails ? false : true)
            }
          >
            <ThemedText style={styles.button}>
              {isLocationDetails ? "Hide" : "More info"}
            </ThemedText>
          </Pressable>
          <Pressable onPress={isTracking ? stopTracking : startTracking}>
            <ThemedText style={styles.button}>
              {isTracking ? "Stop record" : "Start record"}
            </ThemedText>
          </Pressable>
        </>
      )}
      {errorMsg && <ThemedText style={{ color: "red" }}>{errorMsg}</ThemedText>}

      <ThemedText type="subtitle">Weather:</ThemedText>
      {isLoading && <ThemedText>Loading...</ThemedText>}
      {error && <ThemedText>Weather Error</ThemedText>}
      {data && (
        <ThemedView style={styles.gpsSection}>
          <ThemedView style={styles.gpsBlock}>
            <ThemedText>{`${data.name}: ${data.weather[0].description}`}</ThemedText>
            <ThemedText>Temp: {data.main.temp.toString()}</ThemedText>
            <ThemedText>
              Feels like: {data.main.feels_like.toString()}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.gpsBlock}>
            <ThemedText>Humidity: {data.main.humidity.toString()} %</ThemedText>
            <ThemedText>
              Pressure: {data.main.pressure.toString()} mm
            </ThemedText>
            <ThemedText>
              {`Wind: ${data.wind.speed.toString()} m/s, ${data.wind.deg.toString()} deg`}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}

      {track && (
        <>
          <ThemedText type="subtitle">Track:</ThemedText>
          {track.map((point, index) => (
            <ThemedText
              key={index}
            >{`№${index}: lat-${point.coords.latitude} alt-${point.coords.altitude}`}</ThemedText>
          ))}
        </>
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
  gpsSection: {
    flexDirection: "row",
  },
  gpsBlock: {
    marginRight: 16,
  },
  button: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: "#2196f3",
    borderRadius: 2,
    padding: 4,
  },
});
