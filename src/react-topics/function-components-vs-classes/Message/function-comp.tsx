import React, { ChangeEvent, useState } from 'react';
import { Input, Button, message } from 'antd';

export default function FunctionComp(): JSX.Element {
  const [msg, setMsg] = useState('');

  function showMessage(): void {
    message.info(`You said: ${msg}`);
  }

  function handleSendClick(): void {
    setTimeout(showMessage, 3000);
  }

  function handleMsgChange(e: ChangeEvent<HTMLInputElement>): void {
    setMsg(e.target.value);
  }

  return (
    <div className="message-container">
      <Input placeholder="Say something..." value={msg} onChange={handleMsgChange} />
      <Button onClick={handleSendClick} type="primary">Send</Button>
    </div>
  );
}
