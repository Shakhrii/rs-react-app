import { describe, it, expect } from 'vitest';
import { convertToCSV } from './utils';
import type { Pokemon } from '../types/types';

describe('convertToCSV', () => {
  const mockPokemons: Pokemon[] = [
    {
      id: 6,
      name: 'charizard',
      order: 7,
      height: 17,
      weight: 905,
      avatar:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
      baseExperience: 240,
      abilities: 'blaze solar-power ',
      heldItems: '',
    },
    {
      id: 5,
      name: 'charmeleon',
      order: 6,
      height: 11,
      weight: 190,
      avatar:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
      baseExperience: 142,
      abilities: 'blaze solar-power ',
      heldItems: '',
    },
  ];

  it('should convert array of pokemons to CSV string', () => {
    const expectedOutput = [
      'id,name,order,height,weight,avatar,baseExperience,abilities,heldItems',
      '6,charizard,7,17,905,https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png,240,blaze solar-power ,',
      '5,charmeleon,6,11,190,https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png,142,blaze solar-power ,',
    ].join('\n');

    const result = convertToCSV(mockPokemons);
    expect(result).toBe(expectedOutput);
  });

  it('should handle empty array', () => {
    const mockPokemons: Pokemon[] = [];

    expect(() => convertToCSV(mockPokemons)).toThrowError();
  });
});
