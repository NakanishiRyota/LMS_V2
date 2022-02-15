import React from "react";

type InputLabel = {
  title: string | number;
  htmlFor: string;
};

export const InputLabel: React.FC<InputLabel> = (props) => {
  const { title, htmlFor } = props;
  return (
    <label htmlFor={htmlFor}>
      {title}
    </label>
  );
};
