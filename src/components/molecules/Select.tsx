import React from "react";
import { SubjectArray } from "../atoms/select/SubjectArray";

type Select = {
  id: string;
  name: string;
  onChange: (event: any) => any;
};

export const Select: React.FC<Select> = (props) => {
  const { id, name, onChange } = props;
  return (
    <select className="px-4 py-4" id={id} name={name} onChange={onChange}>
      {SubjectArray.map((value) => {
        return <option value={value}>{value}</option>;
      })}
    </select>
  );
};