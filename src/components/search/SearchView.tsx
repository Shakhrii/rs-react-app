import React from "react";

export class SearchView extends React.Component {
  render() {
    return (
      <div className="flex gap-2">
        <input
          className="border-2 border-solid border-amber-500 rounded-md p-1.5 text-neutral-500 placeholder:text-neutral-300 focus:outline-0 hover:border-amber-400 focus:border-amber-400"
          type="text"
          placeholder="type something... "
        />
        <button className="bg-amber-500 px-3 rounded-md text-white hover:bg-amber-400 text-sm">
          Search
        </button>
      </div>
    );
  }
}
