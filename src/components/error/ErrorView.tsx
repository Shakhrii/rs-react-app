import { Component } from "react";
type ErrorViewProps = {
  message: string | undefined;
};
export class ErrorView extends Component<ErrorViewProps> {
  render() {
    return (
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="w-50 h-50 self-center">
          <img src="src/assets/images/corrupted-file.png" alt="empty"></img>
        </div>
        <span className="text-blue-500">{this.props.message}</span>
      </div>
    );
  }
}
