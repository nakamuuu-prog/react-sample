import React from "react";

// <div style='padding: 16px; background-color: grey;'>
// 	<label for="name">名前</label>
// 	<input id="name" class="input-name" type="text" onchange="onChange()" />
// </div>
// を表現するには

const Name = () => {
  const style = { padding: "16px", backgroundColor: "grey" };
  // onchangeイベントを定義
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    // styleはオブジェクトで渡す
    // background-color → backgroundColor
    // 属性が多くなったらオブジェクト型の変数にして渡せる？ → 渡せる
    <div style={style}>
      {/* for → htmlFor */}
      <label htmlFor="name">名前</label>
      {/* class → className、onchange → onChange */}
      <input id="name" className="input-name" type="text" onChange={onChange} />
    </div>
  );
};

export default Name;
