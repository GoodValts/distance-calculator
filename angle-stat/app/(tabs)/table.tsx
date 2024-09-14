import { StyleSheet, Image, Button, Alert } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectTracks } from "@/store/reducers/gpsSlice";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function Table() {
  const gpxCreate = () => {
    console.log("create .gpx");
  };

  const tracks = useAppSelector(selectTracks);

  const downloadGPX = async () => {
    const documentDirectory = `${FileSystem.documentDirectory}`;
    const fileUri = documentDirectory + "track.gpx";

    try {
      await FileSystem.writeAsStringAsync(fileUri, tracks[0]);

      console.log(await FileSystem.getInfoAsync(fileUri));

      // await FileSystem.getContentUriAsync(fileUri).then((cUri) => {
      //   console.log(cUri);
      // });

      // Alert.alert("GPX created");

      Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert("GPX Error:", JSON.stringify(error));
    }
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
      <ThemedText>{`${FileSystem.documentDirectory}`}</ThemedText>
      {tracks.map((track) => (
        <ThemedText key={track.slice(0, 100)}>{track}</ThemedText>
      ))}
      <Button title="Create .gpx file" onPress={downloadGPX}></Button>
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
