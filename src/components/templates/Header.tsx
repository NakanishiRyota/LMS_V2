import * as React from "react";
import { nowMonthDay } from "../../util/DateUtil";

export const Header = () => {
  return (
    <div className="m-0 p-8 bg-emerald-50 flex justify-between">
      <div>
        <img
          className="w-10 h-10"
          src="./images/pen_enpitsu_mark.png"
          alt="鉛筆の画像"
        />
          </div>
          <div>
              <h1 className="text-xl sm:text-2xl">学習管理アプリ</h1>
          </div>
          <div>
              <p className="text-sm sm:text-lg">{nowMonthDay}</p>
          </div>
    </div>
  );
};
