import React from 'react';
import { Button, message } from 'antd';
import { ICompProps } from '../interface';

export default class OptimizedClassComp extends React.Component<ICompProps> {
  showMessage = (user: string): void => {
    message.info(`Followed ${user} - Optimized Class`);
  };

  handleClick = (user: string): void => {
    setTimeout(() => this.showMessage(user), 3000);
  };

  render(): JSX.Element {
    const { user } = this.props;

    return (
      <div>
        <div className="follow-btn"><Button onClick={() => this.handleClick(user)} type="dashed">Follow</Button></div>
      </div>
    );
  }
}
