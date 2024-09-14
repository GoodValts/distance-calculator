import { StyleSheet, Image, Button, Alert } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectTracks } from "@/store/reducers/gpsSlice";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import convertToGPX from "../../services/convertToGPX";

export default function Table() {
  const tracks = useAppSelector(selectTracks);

  console.log(tracks);

  const downloadGPX = async () => {
    Alert.prompt("Type track name");
    const documentDirectory = `${FileSystem.documentDirectory}`;
    const fileUri = documentDirectory + "track.gpx";

    try {
      await FileSystem.writeAsStringAsync(fileUri, convertToGPX(tracks[0]));

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
      {/* <ThemedText>{`${FileSystem.documentDirectory}`}</ThemedText> */}
      {tracks.map((track) => (
        <ThemedText
          key={
            track.length
              ? new Date(track[track.length - 1].timestamp).toISOString()
              : "n/d"
          }
        >
          {convertToGPX(track)}
        </ThemedText>
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
  button: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: "#2196f3",
    borderRadius: 2,
    padding: 4,
  },
});
