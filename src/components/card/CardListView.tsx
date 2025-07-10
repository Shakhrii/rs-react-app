import React from "react";
import type { Pokemon } from "../../types/types";
import { CardView } from "./CardView";

interface CardListViewProps {
  pokemons: Pokemon[];
}
export class CardListView extends React.Component<CardListViewProps> {
  render() {
    return (
      <div className="flex">
        {this.props.pokemons.map((pokemon) => (
          <CardView pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    );
  }
}
