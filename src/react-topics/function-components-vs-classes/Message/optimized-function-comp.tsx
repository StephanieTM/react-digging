import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Input, Button, message } from 'antd';

export default function OptimizedFunctionComp(): JSX.Element {
  const [msg, setMsg] = useState('');

  // Keep track of the latest value.
  const latestMsg = useRef<string>('');
  useEffect(() => {
    latestMsg.current = msg;
  });

  function showMessage(): void {
    message.info(`You said: ${latestMsg.current}`);
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
