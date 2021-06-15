import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { parse } from 'query-string';
import { Button } from 'antd';
import RenderProps from './render-props';
import Hooks from './hooks';
import { ICompType } from './interface';

export default function Comp(props: RouteComponentProps): JSX.Element {
  const { location: { search }, history } = props;
  const { compType = ICompType.render_props } = parse(search);

  function renderComp(): JSX.Element {
    switch (compType) {
      case ICompType.render_props:
        return <RenderProps />;
      case ICompType.hooks:
        return <Hooks />;
      default:
        return <RenderProps />;
    }
  }

  function getSwitchText(): string {
    let nextComp = '';
    switch (compType) {
      case ICompType.render_props:
        nextComp = 'hooks';
        break;
      case ICompType.hooks:
        nextComp = 'render props';
        break;
      default:
        nextComp = 'hooks';
    }
    return `Switch to ${nextComp}`;
  }

  function handleSwitch(): void {
    switch (compType) {
      case ICompType.render_props:
        history.push(`/react-topics/render-props-vs-hooks?compType=${ICompType.hooks}`);
        return;
      case ICompType.hooks:
        history.push(`/react-topics/render-props-vs-hooks?compType=${ICompType.render_props}`);
        return;
      default:
        history.push(`/react-topics/render-props-vs-hooks?compType=${ICompType.hooks}`);
    }
  }

  return (
    <div>
      <h1>Render-Props vs. Hooks</h1>
      <Button onClick={handleSwitch}>{getSwitchText()}</Button>
      {renderComp()}
    </div>
  );
}
