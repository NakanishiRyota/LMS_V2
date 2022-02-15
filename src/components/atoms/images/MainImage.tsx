import React, { useState } from "react";
import img from './kaeru.png'

type MainImageProp = {
  fileUrl: any;
};

export const MainImage = () => {
  const [fileUrl, setFileUrl] = useState<string | undefined>(
    "../images/kaeru.png"
  );
  function processImage(event: any) {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  }
  return (
    <>
      <div className="px-4 py-4 bg-gray-400 w-80 sm:w-1/2">
        <div className="text-center">
        <img className="px-2 py-4" src={img} alt="アバターの画像です。" />
        </div>
        <div className="text-center">
          <input type="file" accept="image/*" onChange={processImage} />
        </div>
      </div>
    </>
  );
};
