import React, { type ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

export default class HeaderView extends React.Component<HeaderProps> {
  render() {
    return <header>{this.props.children}</header>;
  }
}
