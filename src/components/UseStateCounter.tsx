import { useState } from "react";

type CounterProps = {
  initialValue: number;
};

const Counter = (props: CounterProps) => {
  const { initialValue } = props;
  // useStateは状態を扱うためのフック
  // useStateの戻り値は配列
  // const [状態, 更新関数] = useState(初期状態)
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <p>Count:{count}</p>
      {/* 更新関数は値と関数を渡すことができる */}
      {/* 値：状態が渡された値になる */}
      {/* 関数：状態が関数の戻り値になる */}
      {/* 値を渡した時 */}
      <button onClick={() => setCount(count - 1)}>-</button>
      {/* 関数を渡した時 */}
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </div>
  );
};

export default Counter;
