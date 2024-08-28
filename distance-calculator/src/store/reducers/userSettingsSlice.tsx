import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type UserSettingsInterface = {
  isMetric: boolean;
};

const initialState: UserSettingsInterface = {
  isMetric: Boolean(localStorage.getItem('isMetric')) || true,
};

export const userSettingsSlice = createSlice({
  name: 'userSettingsData',
  initialState,
  reducers: {
    setIsMetric: (
      state,
      action: PayloadAction<UserSettingsInterface['isMetric']>
    ) => {
      state.isMetric = action.payload;
    },
  },
});

export const { setIsMetric } = userSettingsSlice.actions;

export const selectIsMetric = (state: RootState) => state.userSettings.isMetric;

const userSettingsReducer = userSettingsSlice.reducer;
export default userSettingsReducer;
