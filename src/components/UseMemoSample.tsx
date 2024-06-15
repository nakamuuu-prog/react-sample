import React, { useState, useMemo } from "react";

// useMemoは値をメモ化するためのフック
// 依存配列の値が前描画時と異なる場合は関数を実行し、すべて同じであれば関数は実行されない
// useMemoSampleは入力欄の入力値が変更されるたびに再描画される
export const UseMemoSample = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickButton = () => {
    setItems((prevItems) => {
      return [...prevItems, text];
    });
    setText("");
  };

  // numberOfCharacters1はメモ化されていないので、UseMemoSampleが再描画されるたびにreduce関数が呼ばれる
  const numberOfCharacters1 = items.reduce((sub, item) => {
    console.log("numberOfCharacters1のreduceが呼ばれました。");
    return sub + item.length;
  }, 0);
  // useMemo(値を生成する関数, 依存配列)
  // numberOfCharacters2はAddボタンを押下するまでreduce関数は呼ばれない
  const numberOfCharacters2 = useMemo(() => {
    return items.reduce((sub, item) => {
      console.log("numberOfCharacters2のreduceが呼ばれました。");
      return sub + item.length;
    }, 0);
  }, [items]);

  return (
    <div>
      <p>UseMemoSample</p>
      <div>
        <input value={text} onChange={onChangeInput} />
        <button onClick={onClickButton}>Add</button>
      </div>
      <div>
        {items.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div>
        <p>Total Number of Characters 1: {numberOfCharacters1}</p>
        <p>Total Number of Characters 2: {numberOfCharacters2}</p>
      </div>
    </div>
  );
};
