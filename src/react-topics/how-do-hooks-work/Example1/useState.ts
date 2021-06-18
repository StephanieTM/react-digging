/* eslint-disable react-hooks/rules-of-hooks */
export function useState<T>(initialValue: T): [() => T,  (newVal: T) => void] {
  let _val: T = initialValue;

  function getState(): T {
    return _val;
  }

  function setState(newVal: T) {
    _val = newVal;
  }

  return [getState, setState];
}

// const [getFoo, setFoo] = useState(0);

// console.log('getFoo() :>> ', getFoo());

// setFoo(1);

// console.log('getFoo() :>> ', getFoo());
