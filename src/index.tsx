import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// App.tsxでエクスポートされたAppコンポーネントを取り込む
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  // index.htmlにあるid属性
  document.getElementById("root") as HTMLElement
);
// 直接HTMLタグをrenderに渡して描写される
root.render(<h1>見出し</h1>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
