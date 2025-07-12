import React, { type ChangeEvent } from "react";

type SearchViewProps = {
  value: string | undefined;
  onSeacrhClick: (value: string) => void;
};

export class SearchView extends React.Component<SearchViewProps> {
  state = {
    value: "",
  };

  handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: event.target.value.toString(),
    });
  }

  handleClick() {
    this.props.onSeacrhClick(this.state.value);
  }

  render() {
    return (
      <div className="flex gap-2">
        <input
          className="border-2 border-solid border-amber-500 rounded-md p-1.5 text-neutral-500 placeholder:text-neutral-300 focus:outline-0 hover:border-amber-400 focus:border-amber-400"
          type="text"
          placeholder="type something... "
          value={this.props.value}
          onChange={(event) => this.handleChangeEvent(event)}
        />
        <button
          onClick={() => this.handleClick()}
          className="bg-amber-500 px-3 rounded-md text-white hover:bg-amber-400 text-sm"
        >
          Search
        </button>
      </div>
    );
  }
}
