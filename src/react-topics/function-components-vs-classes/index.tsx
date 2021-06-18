import React, { useState } from 'react';
import { Radio } from 'antd';
import FunctionProfileComp from './Profile/function-comp';
import ClassProfileComp from './Profile/class-comp';
import OptimizedClassProfileComp from './Profile/optimized-class-comp';
import FunctionMessageComp from './Message/function-comp';
import ClassMessageComp from './Message/class-comp';
import OptimizedFunctionMessageComp from './Message/optimized-function-comp';
import './index.less';

const users = ['Amanda', 'Bill', 'Cathy'];
const { Group: RadioGroup } = Radio;

export default function Comp(): JSX.Element {
  const [user, setUser] = useState(users[0]);

  return (
    <div className="function-components-vs-classes">
      <h1>Function Components vs. Classes</h1>
      <h2>Welcome to {user}&apos;s Profile</h2>
      <div>
        <RadioGroup
          options={users.map(item => ({ label: item, value: item }))}
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="example-container">
        <div className="example">
          <div className="comp-title">Function Component</div>
          <FunctionProfileComp user={user} />
          <FunctionMessageComp />
        </div>
        <div className="example">
          <div className="comp-title">Class Component</div>
          <ClassProfileComp user={user} />
          <ClassMessageComp />
        </div>
        <div className="example">
          <div className="comp-title">Optimized Function/Class Component</div>
          <OptimizedClassProfileComp user={user} />
          <OptimizedFunctionMessageComp />
        </div>
      </div>
    </div>
  );
}
