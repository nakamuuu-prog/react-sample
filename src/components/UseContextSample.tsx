import React, { useContext } from "react";

type User = {
  id: number;
  name: string;
};

const UserContext = React.createContext<User | null>(null);

const GrandChild = () => {
  // useContextを使うことで、Contextから値を参照することができる
  // Consumerで取得する違いは？
  // =>useContextは値を取得する用の関数が不要なので、直感的に使える
  // =>コードが冗長にならない
  // =>React19からはProviderなしでも書けるようになるらしい
  const user = useContext(UserContext);

  return user !== null ? <p>Hello,{user.name}</p> : null;
};

const Child = () => {
  const now = new Date();

  return (
    <div>
      <p>Current: {now.toLocaleString()}</p>
      <GrandChild />
    </div>
  );
};

const Parent = () => {
  const user: User = {
    id: 1,
    name: "Alice",
  };

  return (
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  );
};

export default Parent;
