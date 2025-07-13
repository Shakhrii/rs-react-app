import React, { type ChangeEvent } from 'react';

type SearchViewProps = {
  value: string | undefined;
  onSeacrhClick: (value: string) => void;
};

export class SearchView extends React.Component<SearchViewProps> {
  state = {
    value: this.props.value,
  };

  componentDidMount(): void {
    this.setState({
      value: this.props.value,
    });
  }

  componentDidUpdate(prevProps: Readonly<SearchViewProps>): void {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value,
      });
    }
  }

  handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value.toString().trim();
    this.setState(
      {
        value: inputValue,
      },
      () => {
        if (!inputValue) {
          this.handleClick();
        }
      }
    );
  }

  handleClick() {
    this.props.onSeacrhClick(this.state.value || '');
  }

  render() {
    return (
      <div className="flex gap-2">
        <input
          className="border-2 border-solid
           border-amber-500 rounded-md p-1.5
            text-neutral-500 placeholder:text-neutral-300 
            focus:outline-0 hover:border-amber-400
             focus:border-amber-400 bg-white"
          type="text"
          placeholder="type name or id... "
          value={this.state.value || ''}
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
