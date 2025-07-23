import { useEffect, useState } from 'react';
import './App.css';
import { getFromLS, saveToLS } from '../utils/utils';
import { getPokemons as fetchData } from '../api/Api';
import type { Pokemon } from '../types/types';
import { CardListView } from '../components/card/CardListView';
import ErrorBoundary from '../components/error/ErrorBoundary';
import { ErrorView } from '../components/error/ErrorView';
import HeaderView from '../components/header/HeaderView';
import MainView from '../components/main/MainView';
import { SearchView } from '../components/search/SearchView';
import { SpinnerView } from '../components/spinner/SpinnerView';
const SEARCH_TERM_KEY = 'search_term';

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[] | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>(
    getFromLS(SEARCH_TERM_KEY)
  );
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    getPokemons();
  }, [searchTerm]);

  async function getPokemons(): Promise<Pokemon[]> {
    skipError();
    setLoading(true);

    let result: Pokemon[] = [];

    try {
      const res = await fetchData(searchTerm);
      if (res && !Array.isArray(res)) {
        result = [res];
      } else {
        result = res;
      }
    } catch {
      showError('No results...');
      return [];
    } finally {
      setPokemons(result);
      setLoading(false);
    }
    return result;
  }

  function changeSearchTermHandler(value: string) {
    saveToLS(SEARCH_TERM_KEY, value);
    setSearchTerm(value);
  }

  function resetSearch() {
    changeSearchTermHandler('');
  }

  function showError(message: string) {
    setError(true);
    setMessageError(message);
  }

  function skipError() {
    setError(false);
    setMessageError('');
  }

  return (
    <>
      <div className="flex flex-col gap-15 items-center relative">
        <ErrorBoundary>
          <HeaderView>
            <SearchView
              value={searchTerm}
              onSearchClick={(value) => {
                changeSearchTermHandler(value);
              }}
            />
          </HeaderView>
          <MainView>
            {isLoading ? (
              <SpinnerView />
            ) : error ? (
              <ErrorView
                message={messageError}
                resetSearchHandler={() => resetSearch()}
              />
            ) : (
              <CardListView pokemons={pokemons} />
            )}
          </MainView>
        </ErrorBoundary>
      </div>
    </>
  );
}

// export default class App extends Component {
//   state = {
//     pokemons: undefined,
//     isLoading: true,
//     searchTerm: '',
//     error: false,
//     boundaryError: false,
//     messageError: undefined,
//   };

//   async componentDidMount() {
//     const searchTermValue = getFromLS(SEARCH_TERM_KEY);
//     this.changeSearchTermHandler(searchTermValue)
//     console.log(`App view component did MOUNT  value = ${this.state.searchTerm}`);
//   }

//   componentDidUpdate(): void {
//     if (this.state.boundaryError) {
//       throw Error('Error boundary');
//     }

//     const searchTermValue = getFromLS(SEARCH_TERM_KEY);
//     if (this.state.searchTerm !== searchTermValue) {
//       this.changeSearchTermHandler(searchTermValue)
//     }
//     console.log(`App view component did UPDATE  value = ${this.state.searchTerm}`);
//   }

//   componentWillUnmount(): void {
//     console.log(`App view component will UNMOUNT  value = ${this.state.searchTerm}`);
//   }

//   async getPokemons(): Promise<Pokemon[]> {
//     this.skipError();
//     this.setState({
//       isLoading: true,
//     });

//     let result;

//     try {
//       result = await fetchData(this.state.searchTerm);
//       if (result && !Array.isArray(result)) {
//         result = [result];
//       }
//     } catch {
//       this.showError('No results...');
//       return [];
//     } finally {
//       this.setState({
//         pokemons: result,
//         isLoading: false,
//       });
//     }
//     return result;
//   }

//   showErrorBoundary() {
//     this.setState({
//       boundaryError: true,
//     });
//   }

//   showError(message: string) {
//     this.setState({
//       error: true,
//       messageError: message,
//     });
//     console.log(message);
//   }

//   skipError() {
//     this.setState({
//       error: false,
//       messageError: undefined,
//     });
//   }

//   resetSearch() {
//     this.changeSearchTermHandler('');
//   }

//   changeSearchTermHandler(value: string): void {
//     this.setState(
//       {
//         searchTerm: value,
//       },
//       () => {
//         this.getPokemons();
//         saveToLS(SEARCH_TERM_KEY, value);
//       }
//     );
//   }

//   render() {
//     return (
//       <>
//         <div className="flex flex-col gap-15 items-center relative">
//           <ErrorBoundary>
//             <HeaderView>
//               <SearchView
//                 key={this.state.searchTerm}
//                 value={this.state.searchTerm}
//                 onSearchClick={(value) => {
//                   this.changeSearchTermHandler(value);
//                 }}
//               />
//             </HeaderView>
//             <MainView>
//               {this.state.isLoading ? (
//                 <SpinnerView />
//               ) : this.state.error ? (
//                 <ErrorView
//                   message={this.state.messageError}
//                   resetSearchHandler={() => this.resetSearch()}
//                 />
//               ) : (
//                 <CardListView pokemons={this.state.pokemons} />
//               )}
//               <ButtonBoundaryErrorView />
//             </MainView>
//           </ErrorBoundary>
//         </div>
//       </>
//     );
//   }
// }
