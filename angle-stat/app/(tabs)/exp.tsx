import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, Button } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import * as Location from "expo-location";
import { useEffect, useState } from "react";

import * as Sensors from "expo-sensors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TabTwoScreen() {
  const Gyroscope = Sensors.Gyroscope;

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
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
      <ThemedText type="subtitle">Sensors:</ThemedText>
      <ThemedText>Gyroscope:</ThemedText>
      <Button
        title={subscription ? "on" : "off"}
        onPress={subscription ? _unsubscribe : _subscribe}
      ></Button>
      {subscription && <ThemedText>{`x= ${x}`}</ThemedText>}
      {subscription && <ThemedText>{`y= ${y}`}</ThemedText>}
      {subscription && <ThemedText>{`z= ${z}`}</ThemedText>}
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
