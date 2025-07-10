import React from "react";

export class CardView extends React.Component {
  render() {
    return (
      <div className="w-50 h-55">
        <img
          className="w-full h-2/3"
          src={this.props.pokemon.avatar}
          alt="pokemon avatar"
        ></img>
        <span>{this.props.pokemon.name}</span>
      </div>
    );
  }
}
