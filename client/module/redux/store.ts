import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './rootReducer';
import { AuthState } from './slices/auth-slice';
import { LayoutState } from './slices/layout-slice'; // We'll create this later

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = {
  auth: AuthState;
  layout: LayoutState;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
