// 親からタイトルと子要素を受け取る
// 親から子へ渡すpropsは一方通行。子からpropsの中身を書き換えることはできない。
const Container = (props: {
  title: string;
  children: React.ReactElement;
  children2: React.ReactElement;
}) => {
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
    // React.ReactElement引数を増やして要素追加でいけると思ったけどダメ。脱線するから一旦置いとく。
    // この JSX タグの 'children' prop は型 'ReactElement<any, string | JSXElementConstructor<any>>' の単一の子を予期しますが、複数の子が指定されました。ts(2746)
    <Container title="Hello">
      {/* Containerコンポーネント内の子要素がchildrenとして渡される */}
      {/* 2つ渡す時はどうするの？ */}
      <p>ここの部分が背景色で囲まれます</p>
      <p>この要素は？</p>
    </Container>
  );
};

export default Perent;
