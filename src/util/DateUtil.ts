//現在の日付情報を取得
export let date = new Date();

export const monthNum: number = date.getMonth() + 1;

export const dayNum: number = date.getDate();

export const nowMonthDay = `${monthNum}月${dayNum}日`;

export const getDate = () => {
  const diff = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(Date.now() - diff);
};

//現在のISO時間を取得
export const now: Date = getDate();

//月末のISO時間を取得
export const getTheEndOfMonth = (now: Date): Date => {
  now.setMonth(now.getMonth() + 1);
  now.setDate(0);
  now.setHours(32, 59, 59);
  return now;
};

//月末23:59:59のUnixTimeを取得
export const getTheEndOfMonthUnixTime = (): number => {
  return getTheEndOfMonth(now).getTime();
};

//月初のISO時間を取得
export const getTheBeginningOfMonth = (now: Date): Date => {
  now.setDate(1);
  now.setHours(9, 0, 0);
  return now;
};

//月初00:00:00のUnixTimeを取得
export const getTheBeginningOfMonthUnixTime = (): number => {
  return getTheBeginningOfMonth(now).getTime();
};

export const theBeginningOfMonthUnixTime = getTheBeginningOfMonthUnixTime();
export const theEndOfMonthUnixTime = getTheEndOfMonthUnixTime();

//週初めのISO時間を取得
// TODO: dateがグローバル変数になっているため、プログラム起動後に長時間立つと、計算結果がずれる-->改善したい
export const getTheBeginningOfWeek = () => {
  while (true) {
    if (date.getDay() == 1) break;
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  }
  return date;
};

//週初め00:00:00のUnixTimeを取得
export const getTheBeginningOfWeekUnixTime = () => {
  return getTheBeginningOfWeek().getTime();
};

//週末23:59:59のUnixTimeを取得
export const getTheEndOfWeekUnixTime = () => {
  return getTheBeginningOfWeek().getTime() + (7 * 24 * 60 * 60 - 1) * 1000;
};

export const theBiginningOfWeekUnixTime = getTheBeginningOfWeekUnixTime();
export const theEndOfWeekUnixTime = getTheEndOfWeekUnixTime();

//FormのnowTimeで使用
export const getFormattedNowTime = () => {
  const nowISOstring = getDate().toISOString();
  const array = nowISOstring.split(":");
  const sliced = array.slice(0, 2);
  return sliced.join(":");
};

// ISOStringRoundDownByMin === ISOSRDBM
export const getISOSRDBMNowTime = () => {
  const nowISOstring = getDate().toISOString();
  const array = nowISOstring.split(":");
  const sliced = array.slice(0, 2);
  return sliced.join(":");
};

export const millSecToSec = (millSec: number): number => millSec / 1000;

const EFFECTIVE_DIGIT = 1000000000;

export const secToMin = (sec: number): number =>
  Math.floor((sec / 60) * EFFECTIVE_DIGIT) / EFFECTIVE_DIGIT;

export const millSecToMin = (millSec: number): number =>
  secToMin(millSecToSec(millSec));

//Controllerで使用
export const convertUnixTime = (stringTime: string): number => {
  //1970年1月1日からの経過ミリ秒数を返す
  const time = new Date(stringTime).getTime();
  return time;
};

//1970年1月1日からの経過ミリ秒数を返す
export const ISOSRDBMtoUnixTime = (stringTime: string): number =>
  new Date(stringTime).getTime();

//現在時刻を取得
export const nowTime = getFormattedNowTime();

//現在時刻をUnixTimeで取得
export const nowUnixTime = date.getTime();
