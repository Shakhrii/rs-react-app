import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface CountPageState {
  pageCount: number;
}

const initialState: CountPageState = {
  pageCount: 0,
};

const countPageSlice = createSlice({
  name: 'pageCount',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
  },
  selectors: {
    selectPageCount: (state) => state.pageCount,
  },
});

export default countPageSlice.reducer;
export const { set } = countPageSlice.actions;
export const { selectPageCount } = countPageSlice.selectors;
