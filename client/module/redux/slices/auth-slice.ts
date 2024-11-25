import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../models/auth.type';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isUserLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isUserLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      const { user } = action.payload;
      state.user = user;
    },
    setUserEmailConfirmed(state) {
      if (state.user) {
        state.user = {
          ...state.user,
          isUserEmailConfirmed: true,
        };
      }
    },
    setTokens(state, action: PayloadAction<any>) {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isUserLoggedIn = true;
    },
    logoutUser(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isUserLoggedIn = false;
    },
  },
});

export const { setUser, logoutUser, setTokens, setUserEmailConfirmed } =
  authSlice.actions;
export default authSlice.reducer;
