# Event Capture and Event Bubbling

> via [blog](https://www.quirksmode.org/js/events_order.html) by Peter-Paul Koch, [MDN Doc](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), [W3C Draft](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)

## 场景

假设有多个嵌套的 DOM 元素，每一个元素都有针对同一事件（如点击）的监听回调，在元素重叠部分触发该事件（如点击）时，回调是否全部执行？若执行，以何种顺序执行？

## Event Capture vs. Event Bubbling

![event mode](../../../resources/README/eventflow.svg)

每一个事件监听的触发总是包含事件捕获、目标获取、事件冒泡三个阶段。

事件捕获 (Event Capture) 从 window -> document 向下进行，直到命中目标元素后再原路进行事件冒泡。

事件冒泡 (Event Bubbling) 从目标元素向上进行。

## addEventListener

```javascript
target.addEventListener(type, listener, useCapture = false);
```

addEventListener 的 api 中提供一个入参 useCapture ，其缺省值为 false ，当此值为 true 时监听器监听发生在 Event Capture 阶段的事件，当此值为 false 时监听器监听发生在 Event Bubbling 阶段的事件。

## stopPropagation

```javascript
e.stopPropagation();
```

目标元素的 event 句柄提供 stopPropagation 方法，调用此方法可以阻止事件的传递。若监听函数监听 Event Capture 阶段的事件，则调用后阻止该事件在 Event Capture 阶段的传递， Event Bubbling 阶段同理。
