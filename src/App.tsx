import "./App.css";
import { Component } from "react";
import { CardListView } from "./components/card/CardListView";
import { SearchView } from "./components/search/SearchView";
import type {
  Pokemon,
  PokemonDetailResponse,
  PokemonsResponse,
} from "./types/types";
import { SpinnerView } from "./components/spinner/SpinnerView";

const SERVER_URL = "https://pokeapi.co/api/v2/pokemon";

export default class App extends Component {
  state = {
    pokemons: undefined,
    isLoading: true,
    error: undefined,
    value: undefined,
  };

  async componentDidMount() {
    setTimeout(async () => {
      const result = await this.getPokemons();
      this.setState({
        pokemons: result,
        isLoading: false,
      });
    }, 500);
  }

  showError(message: string) {
    console.log(message);
  }
  async fetchData(): Promise<PokemonsResponse[]> {
    try {
      const response = await fetch(SERVER_URL);
      if (response.ok) {
        const resultResponse = await response.json();
        return resultResponse.results;
      } else {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  parseDetailPokemons(pokemonResponses: PokemonDetailResponse[]): Pokemon[] {
    const pokemons: Pokemon[] = pokemonResponses.map(
      ({ sprites, ...rest }) => ({
        ...rest,
        avatar: sprites.front_default,
      }),
    );
    return pokemons;
  }

  async getPokemons(): Promise<Pokemon[]> {
    const pokemonResponse = await this.fetchData();
    const pokemonsDetailResponse = await Promise.all(
      pokemonResponse.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const resDetail = (await res.json()) as PokemonDetailResponse;
        return resDetail;
      }),
    );

    return this.parseDetailPokemons(pokemonsDetailResponse);
  }

  async fetchPokemonBySearchTerm(
    term: string,
  ): Promise<PokemonDetailResponse | undefined> {
    try {
      const response = await fetch(`${SERVER_URL}/${term}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  parsePokemonDetail(pokemonsDetailResponse: PokemonDetailResponse): Pokemon {
    const { sprites, ...rest } = pokemonsDetailResponse;
    return { ...rest, avatar: sprites.front_default };
  }

  async getPokemonBySearchTerm(term: string): Promise<Pokemon | undefined> {
    const result = await this.fetchPokemonBySearchTerm(term);
    if (result) {
      return this.parsePokemonDetail(result);
    } else {
      return undefined;
    }
  }

  changeSearchTermHandler(value: string): void {
    this.setState({
      isLoading: true,
    });
    setTimeout(async () => {
      let result;
      if (value) {
        result = [await this.getPokemonBySearchTerm(value)];
      } else {
        result = await this.getPokemons();
      }

      if (result) {
        this.setState({
          pokemons: result,
          isLoading: false,
        });
      }
    }, 500);
  }

  render() {
    return (
      <>
        <div className="flex flex-col gap-20 items-center">
          <SearchView
            value={this.state.value}
            onSeacrhClick={(value) => {
              this.changeSearchTermHandler(value);
            }}
          />
          {this.state.isLoading ? (
            <SpinnerView />
          ) : (
            <CardListView pokemons={this.state.pokemons} />
          )}
        </div>
      </>
    );
  }
}
