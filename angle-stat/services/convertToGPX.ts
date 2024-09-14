import * as Location from "expo-location";

export const mockedCoords: Location.LocationObject[] = [
  {
    coords: {
      accuracy: 100,
      altitude: 165.90000915527344,
      altitudeAccuracy: 56.43057632446289,
      heading: 0,
      latitude: 52.4584996,
      longitude: 30.9905622,
      speed: 0,
    },
    mocked: false,
    timestamp: 1726321743797,
  },
  {
    coords: {
      accuracy: 100,
      altitude: 165.90000915527344,
      altitudeAccuracy: 56.43057632446289,
      heading: 0,
      latitude: 52.4584996,
      longitude: 30.9905622,
      speed: 0,
    },
    mocked: false,
    timestamp: 1726321743797,
  },
  {
    coords: {
      accuracy: 100,
      altitude: 163.8,
      altitudeAccuracy: 56.43057632446289,
      heading: 0,
      latitude: 52.53,
      longitude: 30.91,
      speed: 0,
    },
    mocked: false,
    timestamp: 1726321743798,
  },
  {
    coords: {
      accuracy: 100,
      altitude: 163.8,
      altitudeAccuracy: 56.43057632446289,
      heading: 0,
      latitude: 52.55,
      longitude: 30.96,
      speed: 0,
    },
    mocked: false,
    timestamp: 1726321743798,
  },
];

const convertToGPX = (track: Location.LocationObject[]) => {
  if (track.length === 0) return "";
  return `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
    <gpx version="1.1" creator="Angle-Stat">
      <metadata>
        <desc>File with points/tracks from Angle Stat</desc>
        <time>${new Date(track[track.length - 1].timestamp).toISOString()}</time>
      </metadata>
    <trk>
    <name>${new Date().toISOString()}</name>
    <trkseg>
      ${track
        .map(
          (el) => `
          <trkpt lat="${el.coords.latitude.toFixed(6)}" lon="${el.coords.longitude.toFixed(6)}">
            <ele>${el.coords.altitude?.toFixed(2)}</ele>
            <time>${new Date(el.timestamp).toISOString()}</time>
            <hdop>${el.coords.accuracy?.toFixed(2) || 0}</hdop>
            <vdop>${el.coords.altitudeAccuracy?.toFixed(2) || 0}</vdop>
            <extensions>
              <gpxtpx:TrackPointExtension>
                <gpxtpx:course>${el.coords.heading?.toFixed(5) || 0}</gpxtpx:course>
                <gpxtpx:speed>${el.coords.speed?.toFixed(2)}</gpxtpx:speed>
              </gpxtpx:TrackPointExtension>
            </extensions>
          </trkpt>
          `,
        )
        .join("")}</trkseg>
    </trk>
    </gpx>`;
};

export default convertToGPX;
