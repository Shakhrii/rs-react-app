import './App.css';
import { Component } from 'react';
import { CardListView } from './components/card/CardListView';
import { SearchView } from './components/search/SearchView';
import { SpinnerView } from './components/spinner/SpinnerView';
import { ErrorView } from './components/error/ErrorView';
import type { Pokemon } from './types/types';
import ErrorBoundary from './components/error/ErrorBoundary';
import { ButtonBoundaryErrorView } from './components/error/ButtonBoundaryErrorView';
import HeaderView from './components/header/HeaderView';
import MainView from './components/main/MainView';
import { getFromLS, saveToLS } from './utils/utils';
import { getPokemons as fetchData } from './api/Api';
const SEARCH_TERM_KEY = 'search_term';

export default class App extends Component {
  state = {
    pokemons: undefined,
    isLoading: true,
    searchTerm: '',
    error: false,
    boundaryError: false,
    messageError: undefined,
  };

  async componentDidMount() {
    const searchTermValue = getFromLS(SEARCH_TERM_KEY);
    this.setState(
      {
        searchTerm: searchTermValue,
      },
      () => {
        this.getPokemons();
      }
    );
  }

  componentDidUpdate(): void {
    if (this.state.boundaryError) {
      throw Error('Error boundary');
    }
  }

  async getPokemons(): Promise<Pokemon[]> {
    this.skipError();
    this.setState({
      isLoading: true,
    });

    let result;

    try {
      result = await fetchData(this.state.searchTerm);
      if (result && !Array.isArray(result)) {
        result = [result];
      }
    } catch {
      this.showError('No results...');
      return [];
    } finally {
      this.setState({
        pokemons: result,
        isLoading: false,
      });
    }
    return result;
  }

  showErrorBoundary() {
    this.setState({
      boundaryError: true,
    });
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

  resetSearch() {
    this.setState({
      searchTerm: '',
    });
    this.changeSearchTermHandler('');
  }

  changeSearchTermHandler(value: string): void {
    saveToLS(SEARCH_TERM_KEY, value);
    this.setState(
      {
        searchTerm: value,
      },
      () => {
        this.getPokemons();
      }
    );
  }

  render() {
    return (
      <>
        <div className="flex flex-col gap-15 items-center relative">
          <ErrorBoundary>
            <HeaderView>
              <SearchView
                value={this.state.searchTerm}
                onSeacrhClick={(value) => {
                  this.changeSearchTermHandler(value);
                }}
              />
            </HeaderView>
            <MainView>
              {this.state.isLoading ? (
                <SpinnerView />
              ) : this.state.error ? (
                <ErrorView
                  message={this.state.messageError}
                  resetSearchHandler={() => this.resetSearch()}
                />
              ) : (
                <CardListView pokemons={this.state.pokemons} />
              )}
              <ButtonBoundaryErrorView />
            </MainView>
          </ErrorBoundary>
        </div>
      </>
    );
  }
}
