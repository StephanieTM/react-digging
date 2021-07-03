# Imperative vs. declarative

> via [blog](https://medium.com/weekly-webtips/imperative-vs-declarative-programming-in-javascript-25511b90cdb7) by Martin Novak

命令式代码告诉计算机如何做事，声明式程序关注于让计算机做什么事。

命令式编程对应面向对象编程，声明式编程包括逻辑语言和函数式编程。

> imperative code tells the computer how to do things and declarative program focuses on what you want from the computer.

## 语句和表达式

命令式代码使用语句，声明式代码使用表达式。表达式求值为一个值，而语句告诉计算机去做某事。

在命令式编程中，代码基于语句，并且通过告诉计算机如何做事来改变程序的状态。即代码定义变量，并且改变变量的值。

在声明式编程中，代码基于表达式，通过告诉计算机你想要做什么对相应的输入求值。

## 函数式编程

函数式编程只与输入有关，即针对同样的输入给出同样的输出。No mutations。

```javascript
let state = {
  foreground: '#999999',
  background: '#FFFFFF'
};

// directly changes the state object outside of its internal scope
const imperativeMakeBackgroundBlack = () => {
  state.background = '#000000';
};

// takes current state as its input and returns new state with changed value
// without changing the original state
const declarativeMakeBackgroundBlack = state => ({...state, background: '#000000'});

let turtles = ['Galápagos tortoise', 'Greek Tortoise'];

// changes the turtles external array and returns the length of the new array
const imperativeAddTurtle = turtle => turtles.push(turtle);

// takes 'array of turtles' and the 'new turtle' as its input.
// It returns new array of turtles without changing the original array
const declarativeAddTurtle = turtles => turtle => [...turtles, turtle];
```

## 过程式编程与函数式编程

过程式编程是一种命令式编程范式。其代表有 C 语言， Pascal 和 Fortran 。

计算机处理器通过堆栈寄存器为过程式编程提供硬件支持，它可以使你编写非常高效和高性能的代码。

过程代码使用过程来管理其结构。过程只是一组按特定顺序运行的操作，您可以重复调用这些操作，而不是使用goto命令进行跳转。

使用过程而不是类的原理是，将代码构建到单独的模块和脚本中，这些模块和脚本使过程可用，这些过程可用于编排更改。

命令式过程式编程和声明式函数式编程共享模块化和代码重用的原则。
