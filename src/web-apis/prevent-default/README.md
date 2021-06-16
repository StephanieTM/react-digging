# Prevent Default

> via [MDN doc](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)

## 场景

假设有一个 div outer ，其内部有一个勾选框 checkbox ， outer 和 checkbox 上分别有一个 onClick 回调。

正常情况下，点击两个组件重叠的部分会将两个回调都触发一次， checkbox 的先触发， outer 的后触发，且 checkbox 会切换是否选中的状态（ checkbox 的默认行为）。

如果在 checkbox 的点击回调中调用 e.preventDefault() ，那么点击两个组件重叠的部分仍会分别触发两个回调，但 checkbox 的默认行为被阻止。

即事件冒泡不会被阻止，但是默认行为会被阻止。
