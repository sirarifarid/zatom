## Zatom

A concept of using `Zustand` in the core with `Jotai` syntax.

`Zatom` makes it easy to use `Zustand` with an easy syntax like `Jotai`

#### Example

```javascript
// Using zustand
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  updateBears: (newBears) => set({ bears: newBears }),
})

function BearCounter() {
  const bears = useStore((state) => state.bears)
  const increasePopulation = useStore((state) => state.increasePopulation)
  const updateBears = useStore((state) => state.updateBears)
  return <h1>
          {bears}
          {/* To increment */}
          <button onClick={increasePopulation}>Update</button>
          {/* To update */}
          <button onClick={()=> updateBears(2)}>Update</button>
        </h1>
}
```

Too much to write huh!

**Well let's se, how we do it with ZATOM!!!**

```javascript
const ZT_BEARS = zatom(0);

function BearCounter() {
  const [bears, setBears] = useAtom(ZT_ATOM);
  return (
    <h1>
      {bears}
      {/* To increment */}
      <button onClick={() => setBears((p) => p + 1)}>Update</button>
      {/* To update */}
      <button onClick={() => setBears(2)}>Update</button>
    </h1>
  );
}
```

Just like using `useState` or `useAtom`

#### How to use

To use zatom first create a store with `zatom`

```javascript
export const ZT_STORE = zatom(0);
```

Now u have create the store with `zatom` u can use `ZT_STORE` to get or set the value use can also pass types here

**Passing types**

```javascript
type T_ATOM = {
  value1: string,
  value2: string,
};

const ZT_ATOM = zatom < T_ATOM > { value1: "", value2: "" };
```

**Using in component**

```javascript
const [state, setState] = useAtom(ZT_STORE);
```

The `state` gives the value from store. `setState` is just like how u use `setState` from `useState`

U can either pass a value or a callback

```javascript
setState(0);
// or
setState((prevState) => {
  // prevState is the
  return prevState * 2;
});
```
