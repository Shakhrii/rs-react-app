import '@testing-library/jest-dom';
import { server } from '../server/server';
import { pokemonApi } from '../store/slices/api/pokemonApi';
import { setupStore } from '../store/store';
import { afterAll, afterEach, beforeAll } from 'vitest';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(pokemonApi.util.resetApiState());
});

afterAll(() => server.close());
