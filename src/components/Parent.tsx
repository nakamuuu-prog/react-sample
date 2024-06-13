import React, { memo, useState } from "react";

// Reactの再描画のタイミングは以下の3つ
// ・propsや内部の状態が更新されたとき
// ・コンポーネント内で参照しているContextの値が更新されたとき
// ・親コンポーネントが再描画されたとき
// メモ化のフックを使うと親コンポーネントで再描画が発生しても、prppsやcontextの値が変化しない限り子コンポーネントの再描画は発生しない
// 以下は親：Parent、子：Fizz、Buzzという構造になっている
// Parentコンポーネントの再描画が発生するたびにFizzコンポーネントの再描画が発生するが、Buzzコンポーネントの再描画は発生しない

type FizzProps = {
  isFizz: boolean;
};

const Fizz = (props: FizzProps) => {
  const { isFizz } = props;
  console.log(`Fizzが再描写されました, isFizz=${isFizz}`);
  return <span>{isFizz ? "Fizz" : ""}</span>;
};

type BuzzProps = {
  isBuzz: boolean;
  onClick: () => void;
};

// Buzzはmemo関数でメモ化された関数
const Buzz = memo<BuzzProps>((props) => {
  const { isBuzz, onClick } = props;
  console.log(`Buzzが再描写されました, isBuzz=${isBuzz}`);
  return <span onClick={onClick}>{isBuzz ? "Buzz" : ""}</span>;
});

export const Parent = () => {
  const [count, setCount] = useState(1);
  const isFizz = count % 3 === 0;
  // このisBuzzの値が変化しない限り、Buzzコンポーネントの再描画は発生しない
  const isBuzz = count % 5 === 0;

  // ただし、親コンポーネントから関数やオブジェクトをmemo化したコンポーネントに渡すと、親コンポーネントが再描画するたびに子コンポーネントも再描画されてしまう
  const onBuzzClick = () => {
    console.log(`Buzzがクリックされました isBuzz=${isBuzz}`);
  };

  console.log(`Parentが再描写されました, count=${count}`);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <p>{`現在のカウント：${count}`}</p>
      <p>
        <Fizz isFizz={isFizz} />
        <Buzz isBuzz={isBuzz} onClick={onBuzzClick} />
      </p>
    </div>
  );
};
