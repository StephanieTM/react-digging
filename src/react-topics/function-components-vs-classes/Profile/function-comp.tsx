import React from 'react';
import { Button, message } from 'antd';
import { ICompProps } from '../interface';

export default function FunctionComp(props: ICompProps): JSX.Element {
  const { user } = props;

  function showMessage(): void {
    message.info(`Followed ${user} - Function`);
  }

  function handleClick(): void {
    setTimeout(showMessage, 3000);
  }

  return (
    <div>
      <div className="follow-btn"><Button onClick={handleClick} type="dashed">Follow</Button></div>
    </div>
  );
}
