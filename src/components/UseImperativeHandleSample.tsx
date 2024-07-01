import React, { useState, useRef, useImperativeHandle } from "react";

// React.forwardRefでラップすることで親から渡されたrefを子で参照できる
const Child = React.forwardRef((props, ref) => {
  const [message, setMessage] = useState<string | null>(null);
  console.log("Child");

  // useImperativeHandleは親から子が持つデータを参照したり、関数を呼んだりできる
  // 第一引数に親から渡されたref
  // 第二引数に親で実行したい関数や、参照したいプロパティをオブジェクトで渡す
  // 第三引数に依存配列も渡すことができ、特定のデータが変化したときだけオブジェクトを更新することができる
  // ※親が子に依存してしまうため、あまり頻繁には使われない
  useImperativeHandle(ref, () => ({
    showMessage: () => {
      console.log("showMessage");
      const date = new Date();
      const message = `Hello, it's ${date.toLocaleString()} now`;
      setMessage(message);
    },
    test: "test test test",
  }));

  return <div>{message !== null ? <p>{message}</p> : null}</div>;
});

const Parent = () => {
  console.log("Parent");
  const childRef = useRef<{ showMessage: () => void; test: string }>(null);
  const onClick = () => {
    console.log("onClick");
    if (childRef.current !== null) {
      console.log(childRef.current.test);
      childRef.current.showMessage();
    }
  };

  return (
    <div>
      <button onClick={onClick}>Show Message</button>
      <Child ref={childRef} />
    </div>
  );
};

export default Parent;
