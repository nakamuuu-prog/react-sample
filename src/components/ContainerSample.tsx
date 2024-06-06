// 親からタイトルと子要素を受け取る
// 親から子へ渡すpropsは一方通行。子からpropsの中身を書き換えることはできない。
const Container = (props: { title: string; children: React.ReactElement }) => {
  const { title, children } = props;

  return (
    <div style={{ background: "red" }}>
      <span>{title}</span>
      <div>{children}</div>
    </div>
  );
};

const Perent = () => {
  return (
    // titleはMessageコンポーネントと同じよう渡す
    <Container title="Hello">
      {/* Containerコンポーネント内の子要素がchildrenとして渡される */}
      <p>ここの部分が背景色で囲まれます</p>
    </Container>
  );
};

export default Perent;
