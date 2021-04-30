/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface IEmptyFieldProps {
  value?: any;
  onChange?: (value: any) => void;
}

export default React.forwardRef((props: IEmptyFieldProps, ref: React.Ref<any>) => EmptyField(props, ref));

function EmptyField(_props: IEmptyFieldProps, ref: React.Ref<any>): JSX.Element {
  return (
    <div ref={ref} />
  );
}
