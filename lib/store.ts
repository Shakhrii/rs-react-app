'use client';

import { configureStore } from '@reduxjs/toolkit';
import countPageSlice from './features/pagination/countPage.slice';
import selectedItemsSlice from './features/selectedItems/selectedItems.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      pageCount: countPageSlice,
      selectedItems: selectedItemsSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
