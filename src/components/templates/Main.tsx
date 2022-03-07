import React from "react";
import { MainImage } from "../atoms/images/MainImage";
import { Form } from "../organisms/Form";

export const Main = () => {
  return (
    <>
      <div className="flex flex-wrap justify-around">
        <MainImage />
      </div>
      <div className="flex flex-wrap justify-around">
        <Form />
      </div>
    </>
  );
};
