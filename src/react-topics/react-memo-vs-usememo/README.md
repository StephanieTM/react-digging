# React.memo() vs useMemo()

> via [blog](https://blog.logrocket.com/react-memo-vs-usememo/) by Adebola Adeniran

## 什么是 memoization

简单来说， memoization 是一种性能优化的策略，它允许我们把递归函数或包含复杂计算的函数调用的值缓存下来，当下一次这些函数以同样的入参被调用时可以直接使用缓存值，而不是再计算一次。

## 为什么在 react 中使用 memoization

默认情况下，在 react 函数组件中，某个 props 的变化会触发整个组件的重新渲染，包括那些并未使用变更 props 的子组件。

为了研究 react 中的 memoization ，本 demo 编写了 ParentComponent 组件，其中包含为所选奶酪搭配红酒的主要逻辑，还引用了子组件 Counts 。 Counts 组件不接收外部 props ，但会计数并显示组件本身被执行（渲染）的次数。

- 运行 demo ，点击 normal 页签可以看到不使用 React.memo() 或 useMemo() 的示例
- 初始状态下 Counts 组件计数器为0
- 任选一种奶酪，发现计数器 +2
- 每变更奶酪一次，计数器都 +2
- 计数器变更的原因：每次变更奶酪时 ParentComponent 组件内部的两个 state (cheeseType 和 wine) 依次被更新，触发了两次重新渲染
- ParentComponent 重新渲染时会强制 Counts 也重新渲染，尽管 Counts 组件内部没有任何变化发生

即**如果一个组件(可能很复杂)在父组件的无关变量更新时也被触发强制重绘，会造成不必要的性能浪费，甚至导致性能问题，这就是为什么 react 需要 memoization**

## 什么是 React.memo()

在 React v16.6 中， React.memo() 首次被提出，用来为函数组件提供阻止重新渲染的能力。在此之前，类组件已经拥有两种方式 ([PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) 和 [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)) 来控制重新渲染。

React.memo() 是高阶组件 HOC ，即接受一个组件作为 prop ，并返回一个新的组件，返回的组件可以在 props 或组件内部的值未发生变化时跳过重新渲染。

使用方式：用 React.memo() 封装需要被 memoize 的组件，本 demo 针对上一 normal 示例作了 React.memo() 封装

- 运行 demo ，点击 React.memo() 页签可以看到使用 React.memo() 的示例
- 初始状态下 Counts 组件计数器为0
- 任选一种奶酪，发现计数器不变
- 每变更奶酪一次，计数器都不变
- 可以看到 React.memo() 确实阻止了组件的重新渲染

## 什么是 useMemo()

上文提到 React.memo() 是 HOC ， useMemo() 则是一个 React Hook ，通过使用 useMemo() ，可以返回被缓存的值，从而在依赖项没有变更时阻止重新渲染。

我们可以使用useMemo将需要渲染的JSX缓存起来，这样当父组件中与子组件无关的state/props变化时，渲染的是被缓存的JSX。

***注意：* 本 demo 中有两个关于 useMemo 的例子，其中一个来源于本文引用的 blog ，经确认为 broken case**

## Further Reading

- [何种场景不适合使用useMemo()](https://blog.logrocket.com/rethinking-hooks-memoization/)
- [在hooks中获取previous state/props](https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/)
