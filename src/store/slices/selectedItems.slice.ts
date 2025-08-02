import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../../types/types';
export interface SelectedItemsState {
  items: Pokemon[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selected: (state, action: PayloadAction<Pokemon>) => {
      state.items.push(action.payload);
    },
    unselected: (state, action: PayloadAction<Pokemon>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    unselectedAll: () => {
      return initialState;
    },
  },
  selectors: {
    selectSelectedItemIds: (state) => state.items.map((item) => item.id),
    selectSelectedItems: (state) => state.items,
  },
});

export default selectedItemsSlice.reducer;
export const { selected, unselected, unselectedAll } =
  selectedItemsSlice.actions;
export const { selectSelectedItemIds, selectSelectedItems } =
  selectedItemsSlice.selectors;
