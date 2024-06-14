import React, { useState, useCallback } from "react";

// useCallbackは関数をメモ化するためのフック
// コンポーネントをメモ化しただけでは、関数やオブジェクトが渡されたときに再描画が走ってしまう
// useCallbackを使うことで、関数やオブジェクトの影響で再描画が発生することを防ぐことができる

type ButtonProps = {
  onClick: () => void;
};

const DecrementButton = (props: ButtonProps) => {
  const { onClick } = props;

  console.log("DecrementButtonが再描写されました。");

  return <button onClick={onClick}>Decrement</button>;
};

// IncrementButtonはmemoでラップしてメモ化されたコンポーネント
// しかし、Parentコンポーネントのincrement関数はメモ化されていないため、Parentコンポーネントの再描画が発生するたびにIncrementButtonコンポーネントも再描画が発生する
const IncrementButton = React.memo((props: ButtonProps) => {
  const { onClick } = props;

  console.log("IncrementButtonが再描写されました。");

  return <button onClick={onClick}>Increment</button>;
});

// DoubleButtonもmemoでラップしてメモ化されたコンポーネント
// Parentコンポーネントのdouble関数はメモ化されているため、Parentコンポーネントの再描画が発生してもDoubleButtonコンポーネントの再描画は発生しない
const DoubleButton = React.memo((props: ButtonProps) => {
  const { onClick } = props;

  console.log("DoubleButtonが再描写されました。");

  return <button onClick={onClick}>Double</button>;
});

export const Parent = () => {
  const [count, setCount] = useState(0);

  const decrement = () => {
    setCount((c) => c - 1);
  };
  const increment = () => {
    setCount((c) => c + 1);
  };

  const double = useCallback(() => {
    setCount((c) => c * 2);
  }, []);

  return (
    <div>
      <p>Count:{count}</p>
      <DecrementButton onClick={decrement} />
      <IncrementButton onClick={increment} />
      <DoubleButton onClick={double} />
    </div>
  );
};
