import "./App.css";
import { CardListView } from "./components/card/CardListView";
import { SearchView } from "./components/search/SearchView";

function App() {
  const pokemons = [
    {
      name: "clefairy",
      avatar:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
    },
    {
      name: "bulbasaur",
      avatar:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      name: "ivysaur",
      avatar:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    },
    {
      name: "venusaur",
      avatar:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    },
    {
      name: "charmander",
      avatar:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
  ];
  return (
    <>
      <SearchView />
      <CardListView pokemons={pokemons} />
    </>
  );
}

export default App;
