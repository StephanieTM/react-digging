import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import ParentComponent from './ParentComponent';
import { useForceRender, Counts, ReactMemoCounts, UseMemoCounts, useMemoComp } from './Counts';

const { TabPane } = Tabs;

enum CompType {
  normal = 'normal',
  reactMemo = 'React.memo()',
  useMemo = 'useMemo()',
  useMemoComp = 'useMemo() comp',
}

export default function Comp(): JSX.Element {
  const [compType, setCompType] = useState<CompType>(CompType.normal);
  const [memoizedValue, incrementTimes, resetMemoizedValue] = useForceRender();
  const MemoComp = useMemoComp();

  return (
    <div style={{ padding: '20px' }}>
      <Tabs activeKey={compType} onChange={key => setCompType(key as CompType)}>
        <TabPane tab={CompType.normal} key={CompType.normal} />
        <TabPane tab={CompType.reactMemo} key={CompType.reactMemo} />
        <TabPane tab={CompType.useMemo} key={CompType.useMemo} />
        <TabPane tab={CompType.useMemoComp} key={CompType.useMemoComp} />
      </Tabs>
      {
        compType === CompType.normal ? (
          <>
            <h3>Without React.memo() or useMemo()</h3>
            <ParentComponent
              renderCounts={() => (
                <Counts />
              )}
            />
          </>
        ) : null
      }
      {
        compType === CompType.reactMemo ? (
          <>
            <h3>With React.memo()</h3>
            <ParentComponent
              renderCounts={() => (
                <ReactMemoCounts />
              )}
            />
          </>
        ) : null
      }
      {
        compType === CompType.useMemo ? (
          <>
            <h3>With useMemo()</h3>
            <ParentComponent
              renderCounts={() => (
                <>
                  <Button onClick={incrementTimes}>Force render</Button>
                  <UseMemoCounts memoizedValue={memoizedValue} resetMemoizedValue={resetMemoizedValue} />
                </>
              )}
            />
          </>
        ) : null
      }
      {
        compType === CompType.useMemoComp ? (
          <>
            <h3>With useMemo() comp</h3>
            <ParentComponent
              renderCounts={() => (
                <>
                  {MemoComp}
                </>
              )}
            />
          </>
        ) : null
      }
    </div>
  );
}
