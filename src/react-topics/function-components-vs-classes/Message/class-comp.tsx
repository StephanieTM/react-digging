import React, { ChangeEvent } from 'react';
import { Input, Button, message } from 'antd';
import { ICompState } from '../interface';

export default class ClassComp extends React.Component<Record<string, never>, ICompState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      msg: '',
    };
  }

  showMessage = (): void => {
    message.info(`You said: ${this.state.msg}`);
  };

  handleSendClick = (): void => {
    setTimeout(this.showMessage, 3000);
  };

  handleMsgChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      msg: e.target.value,
    });
  };

  render(): JSX.Element {
    return (
      <div className="message-container">
        <Input placeholder="Say something..." value={this.state.msg} onChange={this.handleMsgChange} />
        <Button onClick={this.handleSendClick} type="primary">Send</Button>
      </div>
    );
  }
}
