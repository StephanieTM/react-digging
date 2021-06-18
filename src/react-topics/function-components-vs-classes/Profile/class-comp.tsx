import React from 'react';
import { message, Button } from 'antd';
import { ICompProps } from '../interface';

export default class ClassComp extends React.Component<ICompProps> {
  showMessage = (): void => {
    message.info(`Followed ${this.props.user} - Class`);
  };

  handleClick = (): void => {
    setTimeout(this.showMessage, 3000);
  };

  render(): JSX.Element {
    return (
      <div>
        <div className="follow-btn"><Button onClick={this.handleClick} type="dashed">Follow</Button></div>
      </div>
    );
  }
}
