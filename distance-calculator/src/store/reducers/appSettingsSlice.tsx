import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type AppSettingsInterface = {
  language: 'en' | 'ru' | 'bel';
  theme: 'light' | 'dark';
};

const initialState: AppSettingsInterface = {
  language:
    (localStorage.getItem('language') as AppSettingsInterface['language']) ||
    'en',
  theme:
    new Date().getHours() >= 8 && new Date().getHours() < 22 ? 'light' : 'dark',
};

export const appSettingsSlice = createSlice({
  name: 'appSettingsData',
  initialState,
  reducers: {
    setLanguage: (
      state,
      action: PayloadAction<AppSettingsInterface['language']>
    ) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<AppSettingsInterface['theme']>) => {
      state.theme = action.payload;
    },
  },
});

export const { setLanguage, setTheme } = appSettingsSlice.actions;

export const selectLanguage = (state: RootState) => state.appSettings.language;
export const selectTheme = (state: RootState) => state.appSettings.theme;

const appSettingsReducer = appSettingsSlice.reducer;
export default appSettingsReducer;
