# How to get previous props or state

> via [blog](https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/) by Ohans Emmanuel

## 实现

```typescript
function usePrevious<T>(value: T): T|undefined {
  const valueRef = useRef<T>();
  useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
}
```

## 原理

能够使用 useRef 和 useEffect 实现此功能依赖于以下两个事实：

1. 通过 useRef 生成的 ref 对象是一个固定的引用，其 ref.current 值仅在手动赋值时才会被更新，功能和作用类似于 class component 的实例变量。
2. useEffect 回调只会在调用它的组件渲染(return)之后才被执行，执行时的 value 值是上一次渲染时的 value 。即当本次渲染结束之后，ref的值才会被更新为这次渲染时的 value 值。
