import React, { type ReactNode } from "react";

interface MainProps {
  children?: ReactNode;
}

export default class MainView extends React.Component<MainProps> {
  render() {
    return (
      <main className="w-full flex items-center justify-center">
        {this.props.children}
      </main>
    );
  }
}
