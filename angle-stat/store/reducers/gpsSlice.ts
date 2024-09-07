import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface GpsSlice {
  tracks: string[];
  currentPoint: string;
}

const initialState: GpsSlice = {
  tracks: [],
  currentPoint: "",
};

export const gpsSlice = createSlice({
  name: "gpsData",
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<GpsSlice["tracks"]>) => {
      state.tracks = action.payload;
    },
  },
});

export const { addTrack } = gpsSlice.actions;

export const selectTracks = (state: RootState) => state.gpsSettings.tracks;

const gpsReducer = gpsSlice.reducer;
export default gpsReducer;
