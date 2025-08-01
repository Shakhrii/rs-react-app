import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from './slices/selectedItems.slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
