# Event Propagation

> via [MDN Doc](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)

## 场景

假设有两个 div ， inner 和 outer ， outer 是 inner 的父节点， outer 和 inner 上分别有一个 onClick 回调。

正常情况下，由于事件冒泡，点击两个组件重叠的部分会将两个回调都触发一次， inner 的先触发， outer 的后触发。

如果在 inner 的点击回调中调用 e.stopPropagation() ，那么点击两个组件重叠的部分将只触发 inner 的回调，而不触发其父组件的回调。即事件冒泡结束，不会再向下传递。
