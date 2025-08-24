import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormDataItem } from '../../types/types';

export interface FormDataState {
  items: FormDataItem[];
}

const initialState: FormDataState = {
  items: [],
};

const formDataItemsSlice = createSlice({
  name: 'formDataItems',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<FormDataItem>) => {
      state.items.push(action.payload);
    },
  },
  selectors: {
    selectFormDataItems: (state) => state.items,
  },
});

export default formDataItemsSlice.reducer;
export const { add } = formDataItemsSlice.actions;
export const { selectFormDataItems } = formDataItemsSlice.selectors;
