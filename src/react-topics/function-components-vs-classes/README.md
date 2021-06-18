# Function Components vs. Classes

> via [blog](https://overreacted.io/how-are-function-components-different-from-classes/) by Dan Abramov

## Before Hooks

在 Hooks 问世之前，问题的标准答案是： Class 比起函数组件能提供更多的功能（比如 state ）。

## After Hooks

> Function components capture the rendered values.

## 示例

如本例的 Profile 所示，分别用 Class 和 Hooks 实现一个点击按钮三秒之后提示关注某用户成功的组件。

```typescript
  // Class Component
  // ...

  showMessage = (): void => {
    message.info(`Followed ${this.props.user} - Class`);
  };

  handleClick = (): void => {
    setTimeout(this.showMessage, 3000);
  };

  // ...
```

```typescript
  // Function Component
  // ...

  function showMessage(): void {
    message.info(`Followed ${props.user} - Function`);
  }

  function handleClick(): void {
    setTimeout(showMessage, 3000);
  }

  // ...
```

- 普通场景：
  
  选择用户 Amanda 之后，分别点击两个 Follow 按钮，三秒钟之后分别提示 `Followed Amanda - Class` 和 `Followed Amanda - Function` 。

- 争议场景：

  选择用户 Amanda 之后，分别点击两个 Follow 按钮，并在三秒内切换用户至 Bill ，三秒钟后分别提示 `Followed Bill - Class` 和 `Followed Amanda - Function` 。

- 在这个场景中使用 Class 会造成 bug 。理论上来说，在 A 用户主页点击关注后，即使再切换到其他用户主页，组件也不该对此感到混乱。

- **注意：上述差异本质与 Hooks 无关，是 Function 和 Class 的区别**

## 原因

- Class 组件从 `this.props.user` 读取值。在 React 中， props 是**不可变** (**immutable**) 的，然而， this 总是**可变** (**mutable**) 的，这也是 this 在 Class 中的作用。 React 不停地改变 this 从而使组件的 render 或生命周期钩子能够获取到最新的值。

  > 这暴露了关于用户界面本质的有趣观察。如果我们说 UI 在概念上是当前应用程序状态的函数，那么事件处理程序则是渲染结果的一部分。我们的事件处理程序“属于”由特定的 props 和 state 组成的特定渲染。

  然而，发起一个在回调中读取 this.props 的 setTimeout 打破了这种联系。 showMessage 回调没有被绑定到任何一个特定的渲染上去，所以它获取到了不正确的值。

## 解决

- 假如不使用函数组件，如何解决这个问题？

  - 方法之一是在 setTimeout 调用之前捕获 this.props 的值，将其作为参数传入回调方法，但这样并不优雅——如果我们需要多个 props/state ，或需要在多个方法中捕获 props/state ，这种写法低效且不可靠，一旦有人忽略这个问题就会造成 bug 。

    ```javascript
    class ProfilePage extends React.Component {
      showMessage = (user) => {
        alert('Followed ' + user);
      };

      handleClick = () => {
        const {user} = this.props;
        setTimeout(() => this.showMessage(user), 3000);
      };

      render() {
        return <button onClick={this.handleClick}>Follow</button>;
      }
    }
    ```

  - ***闭包！***

    ```javascript
    class ProfilePage extends React.Component {
      render() {
        // Capture the props!
        const props = this.props;

        // Note: we are *inside render*.
        // These aren't class methods.
        const showMessage = () => {
          alert('Followed ' + props.user);
        };

        const handleClick = () => {
          setTimeout(showMessage, 3000);
        };

        return <button onClick={handleClick}>Follow</button>;
      }
    }
    ```

    如果你在某一次渲染中 ***关住*** 当时的 props 和 state ，那么你可以完全信任它们。

    在 render 方法中使用闭包虽然能够解决问题，但看上去有些奇怪——如果所有方法都在 render 方法中而不是 Class 上定义，那么使用 Class 的意义是什么呢？

    ```javascript
    function ProfilePage({ user }) {
      const showMessage = () => {
        alert('Followed ' + user);
      };

      const handleClick = () => {
        setTimeout(showMessage, 3000);
      };

      return (
        <button onClick={handleClick}>Follow</button>
      );
    }
    ```

- 自此我们看到了在 React 中 Class 和 Function 组件的巨大区别：
  
  > Function components capture the rendered values.

## 此外

某些情况下我们恰恰需要组件不去捕获 props/state ，如本例的 Message 所示，分别用 Class 和 Hooks 实现一个点击按钮三秒之后提示发送了某消息的组件。

```javascript
  // Class Component
  // ...

  showMessage = (): void => {
    message.info(`You said: ${this.state.msg}`);
  };

  handleSendClick = (): void => {
    setTimeout(this.showMessage, 3000);
  };

  handleMsgChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      msg: e.target.value,
    });
  };

  // ...
```

```javascript
  // Function Component
  // ...

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

  // ...
```

- 在这个场景中使用 Function 会造成 bug 。理论上来说，在点击发送按钮之后、真正发送之前用户输入了新的内容，这些内容理应被发送，组件也不该对此感到混乱。

- 此时就需要 ***不去捕获*** 组件的 props/state 值，但对于 function 来说这是违背其天性的，好在 hooks 提供了 useRef 帮我们实现这一功能。

- useRef 就相当于 class 中的 this —— ref 是可变的，其值不与任何一次渲染有强关联。

```javascript
  // Function Component
  // ...

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

  // ...
```
