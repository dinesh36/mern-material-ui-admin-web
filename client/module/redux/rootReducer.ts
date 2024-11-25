import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth-slice';
import layoutSlice from './slices/layout-slice'; // Example slice

const rootReducer = combineReducers({
  auth: authSlice,
  layout: layoutSlice,
});

export default rootReducer;
