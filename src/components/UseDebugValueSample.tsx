import React, { useCallback, useDebugValue, useState } from "react";

// フックはコンポーネントのトップレベルでしか使えない
// if、for、callbackの中で使うとビルドエラー、または実行時にエラーになる
// => どうゆうシチュエーションで発生する？

// 服を使用する関数を新たに定義してコンポーネントのトップレベルで呼び出すことができる
// コードが綺麗に書けるようになり、さらに他のコンポーネントで使うこともできるようになる
const useInput = () => {
  // このuseStateをuseInputの外に出すと実行時にエラー
  const [state, setState] = useState("");
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }, []);

  // Reactのデバッグ用のフック
  // React Developer Toolsというブラウザの拡張機能と一緒に使う
  useDebugValue(`Input: ${state}`);

  return [state, onChange] as const;
};

export const Input = () => {
  const [text, onChangeText] = useInput();

  return (
    <div>
      <input type="text" value={text} onChange={onChangeText} />
      <p>Input: {text}</p>
    </div>
  );
};

// 次のコードと同じ動きをする
// export const Input = () => {
//   const [state, setState] = useState("");
//   const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setState(e.target.value);
//   }, []);

//   useDebugValue(`Input: ${state}`);

//   return (
//     <div>
//       <input type="text" value={state} onChange={onChange} />
//       <p>Input: {state}</p>
//     </div>
//   );
// };

//
// 以下のif文の中でuseEffectを使ったコードで実行時エラーが発生
// import React, { useState, useEffect } from "react";
//
// function ExampleComponent() {
//   const [count, setCount] = useState(0);

//   if (count > 5) {
//     // 条件分岐の中でフックを使うと、毎回のレンダーでフックの順序が変わる可能性があります。
//     useEffect(() => {
//       console.log("Count is greater than 5");
//     }, []);
//   }

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }

// export default ExampleComponent;

// エラーメッセージ
// ERROR
// [eslint]
// src/Test.tsx
//   Line 9:5:  React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render  react-hooks/rules-of-hooks

// Search for the keywords to learn more about each error.
