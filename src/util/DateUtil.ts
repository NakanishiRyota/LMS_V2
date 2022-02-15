//現在の日付情報を取得
let date = new Date();

export const monthNum: number = date.getMonth() + 1;

export const dayNum: number = date.getDate();

export const nowMonthDay = `${monthNum}月${dayNum}日`;


export const getDate = () => {
  const diff = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(Date.now() - diff);
};

//FormのnowTimeで使用
export const getFormattedNowTime = () => {
  const nowISOstring = getDate().toISOString();
  const array = nowISOstring.split(":");
  const sliced = array.slice(0, 2);
  return sliced.join(":");
};


export const millSecToMin = (millSec: number): number => {
  return millSec / 60 / 1000;
};

//Controllerで使用
export const convertUnixTime = (stringTime: string): number => {
  //1970年1月1日からの経過ミリ秒数を返す
  const time = new Date(stringTime).getTime();
  return time;
};

//現在時刻を取得
export const nowTime = getFormattedNowTime();

//現在時刻をUnixTimeで取得
export const nowUnixTime = convertUnixTime(nowTime);