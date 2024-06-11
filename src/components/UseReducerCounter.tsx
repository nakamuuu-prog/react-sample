import { useReducer } from "react";

type Action = "DECREMENT" | "INCREMENT" | "DOUBLE" | "RESET";

// reducer(現在の状態, action) { return 次の状態 } という関数を用意
// ボタンをクリックするとdispachで渡されたActionと現在の数(状態)が渡ってくる
const reducer = (currentCount: number, action: Action) => {
  switch (action) {
    case "INCREMENT":
      return currentCount + 1;
    case "DECREMENT":
      return currentCount - 1;
    case "DOUBLE":
      return currentCount * 2;
    case "RESET":
      return 0;
    default:
      return currentCount;
  }
};

type CounterProps = {
  initialValue: number;
};

const Counter = (props: CounterProps) => {
  const { initialValue } = props;
  // useReducerは状態を扱うためのもう一つのフック
  // 配列やオブジェクトなどの複数のデータを状態として扱う場合によく使われる
  // const [現在の状態, dispatch] = useReducer(reducer, reducerに渡される初期状態)
  const [count, dispach] = useReducer(reducer, initialValue);

  return (
    <div>
      <p>Count: {count}</p>
      {/* dispachでActionを送る */}
      <button onClick={() => dispach("DECREMENT")}>-</button>
      <button onClick={() => dispach("INCREMENT")}>+</button>
      <button onClick={() => dispach("DOUBLE")}>x2</button>
      <button onClick={() => dispach("RESET")}>Reset</button>
    </div>
  );
};

export default Counter;
