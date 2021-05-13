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

## cleanup function

已知 useEffect 的第一个参数是副作用函数，会在渲染之后被执行，如果这个函数返回另一个函数，这个被返回的函数就是 **cleanup function** 。

cleanup function 用来清除副作用，但并不是所有 useEffect 都需要 cleanup function ，假如只是类似于执行 DOM 操作、发起网络请求、打印日志等副作用，是不需要清除的。但若是数据订阅（请求外部数据后通过 setState 将数据缓存在 state 中）等副作用，不清除的话可能会引发内存泄漏等bug。

### 触发时机

组件卸载时会触发 cleanup function 的执行。

> React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why **React also cleans up effects from the previous render before running the effects next time**.
>
> It cleans up the previous effects before applying the next effects.

不过我们也知道， effects 并不是只执行一次，而是每次渲染都会执行，这就是为什么在上一次渲染结束以后、下一次 effects 被执行之前也会触发 cleanup function 的执行。

### 使用 cleanup function 可以解决的问题

- **race condition**

  设想一个用来展示用户好友数量的组件，当 prop userId 变化时根据 userId 查询某用户的好友列表，并将好友数量展示在页面上。此组件使用一个依赖项为 [userId] 的 useEffect ，在 useEffect 内部通过异步方法获取数据，并使用获取到的数据更新 state friendList 。

  ```jsx
  import react, { useEffect, useState } from 'react';
  import { getFriendListByUserId } from './services';

  function FriendNum(props) {
    const { userId } = props;
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
      (async () => {
        const data = await getFriendListByUserId(userId);
        setFriendList(data);
      })();
    }, [userId]);

    return (
      <div>
        User {userId} has {friendList.length} friends.
      </div>
    );
  }
  ```

  当 prop userId 不变时，组件会正常运作，但是当其快速发生变化（会导致多个异步方法同时运行，我们无法确定哪一个会先运行成功）时，问题就会发生：最后成功的异步方法会决定最终的 friendList 值，但与其对应的 userId 可能已经过期了，比如快速将 userId 更换为1、2、3、4、5， userId 为3的那次异步方法是最晚 resolve 的，那么最终 friendList 值会稳定在 userId 为3的用户的好友列表，但实际上 userId 已经变成5了，这显然是一个问题，这就是上文提到的 race condition 。

  为了解决这个问题，我们可以使用 useEffect 来消除副作用。在 useEffect 中声明一个变量 mounted 并初始化为 true ，用来标识某次渲染时的 effect 是否是实时的而不是过时的，并且在 cleanup function 中将这个值更新为 false ，即每当 userId 变化导致组件重新渲染时，这次渲染的 mounted 为 true ，当下一次由于 userId 变化导致的渲染发生时，刚才那次渲染的 mounted 被置为 false 。有了这个标识，我们在副作用的异步方法成功后根据标识来决定要不要更新 state ，如果一个已经过时的副作用中的异步方法成功了，那我们就无需更新 state ，因为我们不需要一个无法与实时的 userId 对应的过期的副作用结果。

  ```jsx
  import react, { useEffect, useState } from 'react';
  import { getFriendListByUserId } from './services';

  function FriendNum(props) {
    const { userId } = props;
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
      let mounted = true;

      (async () => {
        const data = await getFriendListByUserId(userId);
        if (mounted) {
          setFriendList(data);
        }
      })();

      return () => {
        mounted = false;
      };
    }, [userId]);

    return (
      <div>
        User {userId} has {friendList.length} friends.
      </div>
    );
  }
  ```

- **memory leak**
  cleanup function 还可以解决 useEffect 中的内存泄漏问题。

  ```jsx
  import react, { useEffect, useState } from 'react';
  import { getDailyNews } from './services';

  function NewsList() {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
      (async () => {
        const data = await getDailyNews();
        setNewsList(data);
      })();
    }, []);

    return (
      <div>
        {newsList.map(item => (
          <div key={item.id}>
            title: {item.title}
            content: {item.content}
          </div>
        ))}
      </div>
    );
  }
  ```

  此问题与 race condition 类似，也是在 useEffect 中调用了异步方法，当异步方法还未成功时组件被卸载，导致异步方法成功后组件试图更新某个 state 时失败，因为组件已经卸载，该 state 已经不存在了。

  比如 getDailyNews 需要大概2秒钟才能返回，如果组件在挂载后2秒钟以内卸载，我们会在控制台中看到这样的 warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

  解决方案与 race condition 类似，通过一个变量来标识组件是否已经被卸载了。

  ```jsx
  import react, { useEffect, useState } from 'react';
  import { getDailyNews } from './services';

  function NewsList() {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
      let mounted = true;

      (async () => {
        const data = await getDailyNews();
        if (mounted) {
          setNewsList(data);
        }
      })();

      return () => {
        mounted = false;
      };
    }, []);

    return (
      <div>
        {newsList.map(item => (
          <div key={item.id}>
            title: {item.title}
            content: {item.content}
          </div>
        ))}
      </div>
    );
  }
  ```

## Demo

本 demo 研究了 useEffect 、 cleanup function 的作用和时序，详细说明如下。

console.log 打印顺序：

- 点击 Mount child comp 后

```text
 | 1. before everything                                                                   |
 | 2. before effects                                                                      |
 | 3. after effects                                                                       |
 |======================================== render ========================================|
 | 4. after render                                                                        |
 | 5. after the first render                                                              |
 | 6. after the render caused by changing of someProp (including the first render)        |
 | 7. after the render caused by changing of someState (including the first render)       |
```

- 2000ms 后， useEffect 中的异步方法 resolve ，调用 setState ，触发 re-render

```text
 | 1. before everything                                                                   |
 | 2. before effects                                                                      |
 | 3. after effects                                                                       |
 |======================================== render ========================================|
 | 4. cleanup function with no dependency array                                           |
 | 5. after render                                                                        |
```

- 点击 Change state ，调用 setState ，触发 re-render

```text
 | 1. before everything                                                                   |
 | 2. before effects                                                                      |
 | 3. after effects                                                                       |
 |======================================== render ========================================|
 | 4. cleanup function with no dependency array                                           |
 | 5. cleanup function with [someState] dependency array                                  |
 | 6. after render                                                                        |
 | 7. after the render caused by changing of someState (including the first render)       |
```

- 点击 Change props ，传入的 props 值变更，触发 re-render

```text
 | 1. before everything                                                                   |
 | 2. before effects                                                                      |
 | 3. after effects                                                                       |
 |======================================== render ========================================|
 | 4. cleanup function with no dependency array                                           |
 | 5. cleanup function with [someProp] dependency array                                   |
 | 6. after render                                                                        |
 | 7. after the render caused by changing of someProp (including the first render)        |
```

## 总结

> One of the problems we outlined in the Motivation for Hooks is that class lifecycle methods often contain unrelated logic, but related logic gets broken up into several methods.

hooks 被提出的动机之一就是在 class component 的生命周期方法中，经常会包含互不相关的逻辑，但是有关联的逻辑往往又被拆分到不同的生命周期方法中。

> Hooks let us split the code based on what it is doing rather than a lifecycle method name. React will apply every effect used by the component, in the order they were specified.

而 hooks 则允许我们基于代码行为而非生命周期名称来分割代码， React 会按照声明的顺序依次触发每一个副作用。
