import React, { useState } from "react";
import img from "./kaeru.png";

type MainImageProp = {
  fileUrl: any;
};

//TODO: MainImageはatomeではないので、別の場所で定義する
export const MainImage = () => {
  const [fileUrl, setFileUrl] = useState<string | undefined>(img);
  function processImage(event: any) {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  }
  return (
    <>
      <div className="px-4 py-4 w-80 sm:w-1/2">
        <div className="text-center">
          <img
            className="px-2 py-4 m-auto"
            src={fileUrl}
            alt="アバターの画像です。"
          />
        </div>
        <div className="text-center">
          <input
            type="file"
            accept="image/*"
            onChange={processImage}
            title=""
          />
        </div>
      </div>
    </>
  );
};
