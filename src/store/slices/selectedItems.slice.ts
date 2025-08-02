import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface SelectedItemsState {
  ids: number[];
}

const initialState: SelectedItemsState = {
  ids: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selected: (state, action: PayloadAction<{ id: number }>) => {
      state.ids.push(action.payload.id);
    },
    unselected: (state, action: PayloadAction<{ id: number }>) => {
      const unselectedId = action.payload.id;
      state.ids = state.ids.filter((id) => id !== unselectedId);
    },
  },
  selectors: {
    selectSelectedItemIds: (state) => state.ids,
  },
});

export default selectedItemsSlice.reducer;
export const { selected, unselected } = selectedItemsSlice.actions;
export const { selectSelectedItemIds } = selectedItemsSlice.selectors;
