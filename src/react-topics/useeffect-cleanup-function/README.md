# useEffect cleanup function

> via [official doc](https://reactjs.org/docs/hooks-effect.html) from ReactJS

## useEffect

### 概念

> By using this Hook (useEffect), you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.

阅读 React 官方文档中关于 useEffect 的部分，可以得知 useEffect 用来为渲染添加副作用，即在 React 更新 DOM 之后做一些额外操作。通过 useEffect 可以实现类似于 class component 中 componentDidMount, componentDidUpdate 和 componentWillUnmount 三个生命周期的功能。

> Placing useEffect inside the component lets us access the state variable (or any props) right from the effect. We don’t need a special API to read it — it’s already in the function scope. Hooks embrace JavaScript closures and avoid introducing React-specific APIs where JavaScript already provides a solution.

useEffect 同 useState 等其他 hook 一样，需要在函数组件内部或 custom hook 内部调用，这正是 useEffect 的设计理念，通过在组件内调用 useEffect ，我们可以在 hook 内部轻松获取 state 或 props 的值，而无需额外定义一个专属于 React 的 API —— 既然 JavaScript 已经提供了闭包的解决方案。

> React guarantees the DOM has been updated by the time it runs the effects.

默认情况（不传入第二个参数）， React 确保 useEffect 在每次渲染（包括第一次渲染）后都会被执行。每一次渲染后， 通过 useEffect 传入的函数都是一个全新的（不同于上一次渲染时的）函数，这也是设计者有意为之，以此来确保每次渲染时拿到的 state 或 props 值都是最新的。这也使得 useEffect 更像是渲染结果的一部分，每一个 effect 都“属于”一次特定的渲染。

### 与生命周期的区别

> Unlike componentDidMount or componentDidUpdate, effects scheduled with useEffect don’t block the browser from updating the screen. This makes your app feel more responsive. The majority of effects don’t need to happen synchronously. In the uncommon cases where they do (such as measuring the layout), there is a separate useLayoutEffect Hook with an API identical to useEffect.

上文提到，通过 useEffect 可以模拟 componentDidMount 和 componentDidUpdate 的功能，但它们之间也有区别， useEffect 不会阻塞浏览器更新屏幕，因为其主要部分不需要同步执行。如果确实需要同步执行，可以使用 useLayoutEffect hook 。

### 在 useEffect 中使用 async function

有时副作用可能需要是一个 async function ，例如在组件首次渲染之后发起网络请求获取数据，待数据返回后将其存储在 state 中，但如果直接向 useEffect 传递一个 async function ，我们会得到这样的 warning: Effect callbacks are synchronous to prevent race conditions. 以及: useEffect function must return a cleanup function or nothing. Promises and useEffect(async () => ...) are not supported, but you can call an async function inside an effect.

一方面， React 将 useEffect 第一个参数的返回值视为副作用的清除函数，而 async function 会返回一个 Promise，类型不符合。

若确实需要使用异步方法，可以在 useEffect 的第一个参数中执行一个异步方法，而不是直接传递异步方法作为第一个参数。

另外，useEffect 原生不支持 async function 的主要原因在于异步方法会造成 race condition ，若未得到妥善处理会导致 bug 的发生，为了[解决 race condition](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect) ，可以使用 cleanup function (可配合AbortController) 来清除副作用。
