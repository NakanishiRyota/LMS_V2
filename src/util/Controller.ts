import { convertUnixTime, millSecToMin, nowUnixTime, theBeginningOfMonthUnixTime, theEndOfMonthUnixTime, theBiginningOfWeekUnixTime, theEndOfWeekUnixTime} from "./DateUtil";

const SEVEN_DAYS_IN_MILLSECONDS = 7 * 24 * 60 * 60 * 1000;

export type studyLog = {
  id: number;
  subject: string;
  startTime: string;
  finishTime: string;
};

//startTimeを1970年1月1日からの経過ミリ秒数に変換
const getStartTime = (studyLog: studyLog): number => {
  const startTimeString = studyLog.startTime;
  const startTime = convertUnixTime(startTimeString);
  return startTime;
};

//finishTimeを1970年1月1日からの経過ミリ秒数に変換
const getFinishTime = (studyLog: studyLog): number => {
  const finishTimeString = studyLog.finishTime;
  const finishTime = convertUnixTime(finishTimeString);
  return finishTime;
};

const getStudyTime = (studyLog: studyLog) => {
  const startTime = getStartTime(studyLog);
  const finishTime = getFinishTime(studyLog);
  return { startTime, finishTime };
};

export const all = () => true;

export const inThisWeek = ([startTime, finishTime]: [number, number]): boolean => {
  const startUnixTime = startTime;
    if (
      startUnixTime - theBiginningOfWeekUnixTime >= 0 &&
      startUnixTime - theEndOfWeekUnixTime <= 0
    ) {
      return true;
    } else {
      return false;
    }
}



const inThisMonth = ([startTime, finishTime]): boolean => {
  const startUnixTime = startTime;
  if (
    startUnixTime - theBeginningOfMonthUnixTime >= 0 &&
    startUnixTime - theEndOfMonthUnixTime <= 0
  ) {
    return true;
  } else {
    return false;
  }
};



export const pickKV =
  (keys: Array<string | number>) =>
  ([key, value]: any) =>
    keys.includes(key);

export const pickStartTimeFinishTime = pickKV(["startTime", "finishTime"]);

export const applyValue =
  (f: Function) =>
  ([key, value]: any) =>
    f(value);

const applyConvertUnixTimeToValue = applyValue(convertUnixTime);

const pickStartTimeFinishTimeFrom = (studyLogs: studyLog[]) =>
  studyLogs.map((studyLog) =>
    Object.entries(studyLog).filter(pickStartTimeFinishTime)
  );

const calcStudyTimeWith =
  (timeCond: (args: any) => boolean) => (studyLogs: studyLog[]) =>
    studyLogs
      .map((studyLog) =>
        Object.entries(studyLog)
          .filter(pickStartTimeFinishTime)
          .map(applyConvertUnixTimeToValue)
      )
      // [ [ 4314784392479, 84394280438290 ], [ 4839248290348, 89432048209 ],[ 4839248290348, 89432048209 ]]
      .filter(timeCond)
      // [ [ 4314784392479, 84394280438290 ], [ 4839248290348, 89432048209 ]]
      .map(([startTime, finishTime]) => millSecToMin(finishTime - startTime))
      // [ 10, 8]
      .reduce((acm, value) => acm + value, 0);
// 18

export const calcTotalStudyTime = calcStudyTimeWith(all);
export const calcThisMonthStudyTime = calcStudyTimeWith(inThisMonth);
export const calcThisWeekTotalStudyTime = calcStudyTimeWith(inThisWeek);

//以下、国数英社理の勉強時間を計算する

const calsSubjectStudyTime =
  (subject: string) =>
  (studyLogs: studyLog[]): number =>
    millSecToMin(
      studyLogs
        .filter((studyLog) => studyLog.subject === subject)
        .map((studyLog) => getStudyTime(studyLog))
        .reduce(
          (acum, { startTime, finishTime }) => acum + finishTime - startTime,
          0
        )
    );

export const calcJapaneseTotalStudyTime = calsSubjectStudyTime("国語");
export const calcMathTotalStudyTime = calsSubjectStudyTime("数学");
export const calcEnglishTotalStudyTime = calsSubjectStudyTime("英語");
export const calcSocialstudyTotalStudyTime = calsSubjectStudyTime("社会");
export const calcScienceTotalStudyTime = calsSubjectStudyTime("理科");
