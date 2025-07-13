import { Component } from 'react';

export class ButtonBoundaryErrorView extends Component {
  state = {
    throwError: false,
  };

  clickHandler() {
    this.setState({
      throwError: true,
    });
  }

  componentDidUpdate(): void {
    if (this.state.throwError) {
      throw Error('Render Error from ButtonBoundaryErrorView');
    }
  }

  render() {
    return (
      <button
        onClick={() => this.clickHandler()}
        className="text-white bg-gradient-to-r from-red-400 via-red-500
            to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
              focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 
              dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 
              py-2.5 text-center me-2 mb-2 fixed bottom-10 right-10"
      >
        Show Error
      </button>
    );
  }
}
