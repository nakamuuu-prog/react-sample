import React from "react";

type ContainerProps = {
  title: string;
  // なんでReactElementからReactNodeになったのか？
  // ⇒ReactNodeはReactでレンダリング可能なすべての要素を含む型
  // ⇒中身を見るとReactElementを含むUnion型になっている
  // ⇒コンポーネントの子要素やレンダリングメソッドの戻り値として使用される、より広範な型
  // ReactElementは、特定のReact要素を表し、JSXの生成や特定の要素を期待する場合に使用
  children: React.ReactNode;
};

// 親からタイトルと子要素を受け取る
// 親から子へ渡すpropsは一方通行。子からpropsの中身を書き換えることはできない。
const Container = (props: ContainerProps) => {
  const { title, children } = props;

  // エラーにならない。どうゆうこと？
  // props = { title: "あいうえお", children: <p>かきくけこ</p> };
  // propsの中身を直接書き換えようとするとエラーになる
  // 定数であるため、'title' に代入することはできません。ts(2588)
  // title = "さしすせそ";

  return (
    <div style={{ background: "red" }}>
      <span>{title}</span>
      <div>{children}</div>
    </div>
  );
};

const Perent = () => {
  return (
    // 子要素2つ渡す時はどうするの？
    // React.ReactElement引数を増やして要素追加でいけると思ったけどダメ。脱線するから一旦置いとく。
    // → ReactNode型にして解決
    // この JSX タグの 'children' prop は型 'ReactElement<any, string | JSXElementConstructor<any>>' の単一の子を予期しますが、複数の子が指定されました。ts(2746)
    <Container title="Hello">
      {/* Containerコンポーネント内の子要素がchildrenとして渡される */}
      <p>ここの部分が背景色で囲まれます</p>
      <p>この要素は？</p>
    </Container>
  );
};

export default Perent;
