import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import appSettingsReducer from './reducers/app-settings-slice';
import userSettingsReducer from './reducers/user-settings-slice';

export const reducers = combineReducers({
  appSettings: appSettingsReducer,
  userSettings: userSettingsReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export type RootReducer = ReturnType<typeof reducers>;
