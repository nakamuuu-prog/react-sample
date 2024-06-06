// コンポーネントは見た目と振る舞いをセットにしたUIの部品
// Text(子)とMessage(親)というコンポーネントを定義
// コンポーネントはパスカルケースでないとコンポーネントとして認識してくれない
const Text = (props: { content: string }) => {
  // 親から渡されたキーをpropsから取り出してpタグにセット
  const { content } = props;
  return <p className="text">{content}</p>;
};

const Message = (props: {}) => {
  const content1 = "This is parent component";
  const content2 = "Message uses Text component";

  return (
    <div>
      {/* contentというキーで子に値を渡す */}
      <Text content={content1} />
      <Text content={content2} />
    </div>
  );
};

export default Message;
