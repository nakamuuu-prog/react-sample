const Hello = () => {
  const onClick = () => {
    alert("hello");
  };
  const text = "Hello! React";
  // クリックイベントonClickに関数をセットする
  // {}内にJSを埋め込める
  return <div onClick={onClick}>{text}</div>;
};

export default Hello;
