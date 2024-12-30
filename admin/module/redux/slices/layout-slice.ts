import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayoutState {
  isLoadingGlobally: boolean;
}

const initialState: LayoutState = {
  isLoadingGlobally: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setGlobalLoaderState(state, action: PayloadAction<boolean>) {
      state.isLoadingGlobally = action.payload;
    },
  },
});

export const { setGlobalLoaderState } = layoutSlice.actions;
export default layoutSlice.reducer;
