import React, { useEffect, useState } from 'react';
import { Button, ButtonProps } from 'antd';
import { constants } from './utils';

const { MOZARELLA, CHEDDAR, PARMESAN, CABERNET, CHARDONAY, MERLOT } = constants;

export default function ParentComponent(props: { renderCounts: () => JSX.Element }): JSX.Element {
  const { renderCounts } = props;
  const [cheeseType, setCheeseType] = useState<string>('');
  const [wine, setWine] = useState<string>('');

  useEffect(() => {
    const whichWineGoesBest = () => {
      switch (cheeseType) {
        case MOZARELLA:
          return setWine(CABERNET);
        case CHEDDAR:
          return setWine(CHARDONAY);
        case PARMESAN:
          return setWine(MERLOT);
        default:
      }
    };

    let mounted = true;
    if (mounted) {
      whichWineGoesBest();
    }
    return (): void => {
      mounted = false;
    }
  }, [cheeseType]);

  function getButtonType(cheese: string): ButtonProps['type'] {
    return cheeseType === cheese ? 'primary' : 'default';
  }

  return (
    <div>
      <h1>Select a cheese and we will tell you which wine goes best!</h1>
      <div>
        <Button type={getButtonType(MOZARELLA)} onClick={() => setCheeseType(MOZARELLA)}>{MOZARELLA}</Button>
        <Button type={getButtonType(CHEDDAR)} onClick={() => setCheeseType(CHEDDAR)}>{CHEDDAR}</Button>
        <Button type={getButtonType(PARMESAN)} onClick={() => setCheeseType(PARMESAN)}>{PARMESAN}</Button>
      </div>
      {cheeseType ? (
        <p>
          For {cheeseType}, <span>{wine}</span> goes best.
        </p>
      ) : null}
      {renderCounts()}
    </div>
  );
}
