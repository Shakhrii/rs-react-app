import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from './slices/selectedItems.slice';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonApi } from './slices/api/pokemonApi';

const rootReducer = combineReducers({
  selectedItems: selectedItemsSlice,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const setupStore = (preloadedState?: Partial<AppState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
