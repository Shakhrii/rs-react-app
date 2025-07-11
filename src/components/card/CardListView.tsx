import React from "react";
import type { Pokemon } from "../../types/types";
import { CardView } from "./CardView";

interface CardListViewProps {
  pokemons: Pokemon[] | null;
}
export class CardListView extends React.Component<CardListViewProps> {
  render() {
    return (
      <div className="flex flex-wrap justify-center gap-5">
        {this.props.pokemons?.map((pokemon) => (
          <CardView pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    );
  }
}
