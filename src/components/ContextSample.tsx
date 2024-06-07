import React from "react";

// Contextを使うと親から子に直接データを渡さなくても受け渡しができる
const TitleContext = React.createContext("");

// 孫
const Title = () => {
  return (
    // Consumerの中で関数を実装して受け取る
    <TitleContext.Consumer>
      {(title) => {
        return <h1>{title}</h1>;
      }}
    </TitleContext.Consumer>
  );
};

// 子
const Header = () => {
  return (
    <div>
      <Title />
    </div>
  );
};

// 親
const Page = () => {
  const title = "React Book";

  return (
    // Providerに値を渡す
    <TitleContext.Provider value={title}>
      {/* Providerを入れ子にすると、一番近いProviderの値が渡る */}
      <TitleContext.Provider value={"React Music"}>
        <Header />
      </TitleContext.Provider>
    </TitleContext.Provider>
  );
};

export default Page;
