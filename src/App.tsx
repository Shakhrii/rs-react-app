import "./App.css";
import { Component } from "react";
import { CardListView } from "./components/card/CardListView";
import { SearchView } from "./components/search/SearchView";
import { SpinnerView } from "./components/spinner/SpinnerView";
import { ErrorView } from "./components/error/ErrorView";
import type {
  Pokemon,
  PokemonDetailResponse,
  PokemonsResponse,
} from "./types/types";

const SERVER_URL = "https://pokeapi.co/api/v2/pokemon";

export default class App extends Component {
  state = {
    pokemons: undefined,
    isLoading: true,
    value: undefined,
    error: undefined,
    messageError: undefined,
  };

  async componentDidMount() {
    setTimeout(async () => {
      const result = await this.getPokemons();
      this.setState({
        pokemons: result,
        isLoading: false,
        isError: false,
        messageError: undefined,
      });
    }, 200);
  }

  showError(message: string) {
    this.setState({
      error: true,
      messageError: message,
    });
    console.log(message);
  }

  skipError() {
    this.setState({
      error: false,
      messageError: undefined,
    });
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
    } catch {
      this.showError("Something went wrong...");
      return [];
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  parseDetailPokemons(pokemonResponses: PokemonDetailResponse[]): Pokemon[] {
    const pokemons: Pokemon[] = pokemonResponses.map(
      ({ sprites, abilities, ...rest }) => ({
        ...rest,
        abilities: abilities.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.ability.name + " ",
          "",
        ),
        avatar: sprites.front_default,
      }),
    );
    return pokemons;
  }

  async getPokemons(): Promise<Pokemon[]> {
    this.skipError();

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
    } catch {
      this.showError(`Doesnt find anything with "${term}"`);
      return undefined;
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  parsePokemonDetail(pokemonsDetailResponse: PokemonDetailResponse): Pokemon {
    const { sprites, abilities, ...rest } = pokemonsDetailResponse;
    return {
      ...rest,
      avatar: sprites.front_default,
      abilities: abilities.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.ability.name + " ",
        "",
      ),
    };
  }

  async getPokemonBySearchTerm(term: string): Promise<Pokemon | undefined> {
    this.skipError();

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
        result = await this.getPokemonBySearchTerm(value);
        if (result) {
          result = [result];
        }
      } else {
        result = await this.getPokemons();
      }

      if (result) {
        this.setState({
          pokemons: result,
          isLoading: false,
        });
      }
    }, 200);
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
          ) : this.state.error ? (
            <ErrorView message={this.state.messageError} />
          ) : (
            <CardListView pokemons={this.state.pokemons} />
          )}
        </div>
      </>
    );
  }
}
