import React from "react";

type InputLabel = {
  title: string | number;
  htmlFor: string;
};
// TODO: このコンポーネントの役割を明確にする＆他の人がコードを見てもわかるようにコメントなりをつける
export const InputLabel: React.FC<InputLabel> = (props) => {
  const { title, htmlFor } = props;
  return (
    <label htmlFor={htmlFor}>
      {title}
    </label>
  );
};
