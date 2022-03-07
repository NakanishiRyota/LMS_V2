import React from "react";
import { MainImage } from "../atoms/images/MainImage";
import { Form } from "../organisms/Form";

export const Main = () => {
return (
  // 使う側がLayout情報を定義していてGood
  <div className="flex flex-wrap justify-around">
    <MainImage />
    {/* From?? */}
    {/* <div レイアウトを規定> */}
    <Form />
    {/* <Table /> */}
    {/*</div>  */}
  </div>
);
};
