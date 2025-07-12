import React from "react";
import type { Pokemon } from "../../types/types";

interface CardViewProps {
  pokemon: Pokemon;
}

export class CardView extends React.Component<CardViewProps> {
  render() {
    return (
      <div className="w-50 flex flex-col items-start shadow hover:bg-amber-500/50 rounded-sm transition-colors duration-300 ease-in-out active:bg-amber-500">
        <img
          className="w-full h-2/3"
          src={this.props.pokemon.avatar}
          alt="pokemon avatar"
        ></img>
        <div className="flex flex-col items-start p-5">
          <span className="text-sm">
            <span className="font-bold">name: </span>
            {this.props.pokemon.name}
          </span>
          <span className="text-sm">
            <span className="font-bold">height: </span>
            {this.props.pokemon.height}
          </span>
          <span className="text-sm">
            <span className="font-bold">weight: </span>
            {this.props.pokemon.weight}
          </span>
          <span className="text-sm flex">
            <span className="font-bold">abilities: </span>
            {this.props.pokemon.abilities}
          </span>
        </div>
      </div>
    );
  }
}
