import {
  isCallSignatureDeclaration,
  reduceEachLeadingCommentRange,
} from "typescript";
import { convertUnixTime, millSecToMin, nowUnixTime } from "./DateUtil";

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

export const inThisWeek = (studyLogs: studyLog[]): boolean => {
  studyLogs
    // studyLog[] == Array<studyLog>
    .map(
      (studyLog) =>
        Object.entries(studyLog)
          // [key, value][] == Array<[k, v]> == [[id, 数値],[subject, 文字列], [starttime, 文字列], [finishTime, 文字列]]
          .filter(([key, value]) => key === "startTime")
      // [key, value][] == Array<[k, v]> == [[starttime, 文字列]]
    )
    // [key, value][][] === Array<Array<[k,v]>> == [[[starttime, 文字列]],[[starttime, 文字列]],[[starttime, 文字列]] .... ]
    .map(([key, value]) => {
      if (typeof value === "string") {
        return convertUnixTime(value);
      } else {
        throw new Error();
      }
    })
    //[123982198, 129389123, 12389123891]
    .filter((x) => {
      return typeof x === "number";
    })
    .filter((startUnixTime) => {
      if (
        nowUnixTime - startUnixTime >= -604800000 &&
        nowUnixTime - startUnixTime <= 604800000
      ) {
        return true;
      } else {
        return false;
      }
    })
    //[123982198, 129389123]
    .reduce((prev, curr) => prev + curr, 0);
  // 23892389047
  // return true;
};

// const inThisWeek = ([startTime, finishTime]: [number, number]): boolean => {
//   if(startTimeが今週) return true
//   else return false
// }

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
// export const calcThisMonthStudyTime = calcStudyTimeWith(inThisMonth);
export const calcThisWeekTotalStudyTime = calcStudyTimeWith(inThisWeek);

//以下、国数英社理の勉強時間を計算する

const xxxx =
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

const japanese = xxxx("国語");
const math = xxxx("数学");

const aaa = (first: string) => (second: string) => first + second;
const firstYear = aaa('1年生')
const secondYear = aaa('2年生')

console.log(firstYear('藤城')) // 1年生藤城
console.log(secondYear('スズキ')) // ２年生すずき

const calcSubjectTotalStudyTime = [
  {
    subject: "国語",
    func: function (studyLogs: studyLog[]): number {
      let startTimeSum = 0;
      let finishTimeSum = 0;
      studyLogs.forEach((studyLog) => {
        if (studyLog.subject === this.subject) {
          const { startTime, finishTime } = getStudyTime(studyLog);
          startTimeSum += startTime;
          finishTimeSum += finishTime;
        }
      });
      return millSecToMin(finishTimeSum - startTimeSum);
    },
  },
  {
    subject: "数学",
    func: function (studyLogs: studyLog[]): number {
      let startTimeSum = 0;
      let finishTimeSum = 0;
      studyLogs.forEach((studyLog) => {
        if (studyLog.subject === this.subject) {
          const { startTime, finishTime } = getStudyTime(studyLog);
          startTimeSum += startTime;
          finishTimeSum += finishTime;
        }
      });
      return millSecToMin(finishTimeSum - startTimeSum);
    },
  },
  {
    subject: "英語",
    func: function (studyLogs: studyLog[]): number {
      let startTimeSum = 0;
      let finishTimeSum = 0;
      studyLogs.forEach((studyLog) => {
        if (studyLog.subject === this.subject) {
          const { startTime, finishTime } = getStudyTime(studyLog);
          startTimeSum += startTime;
          finishTimeSum += finishTime;
        }
      });
      return millSecToMin(finishTimeSum - startTimeSum);
    },
  },
  {
    subject: "社会",
    func: function (studyLogs: studyLog[]): number {
      let startTimeSum = 0;
      let finishTimeSum = 0;
      studyLogs.forEach((studyLog) => {
        if (studyLog.subject === this.subject) {
          const { startTime, finishTime } = getStudyTime(studyLog);
          startTimeSum += startTime;
          finishTimeSum += finishTime;
        }
      });
      return millSecToMin(finishTimeSum - startTimeSum);
    },
  },
  {
    subject: "理科",
    func: function (studyLogs: studyLog[]): number {
      let startTimeSum = 0;
      let finishTimeSum = 0;
      studyLogs.forEach((studyLog) => {
        if (studyLog.subject === this.subject) {
          const { startTime, finishTime } = getStudyTime(studyLog);
          startTimeSum += startTime;
          finishTimeSum += finishTime;
        }
      });
      return millSecToMin(finishTimeSum - startTimeSum);
    },
  },
];

export const calcJapaneseTotalStudyTime = calcSubjectTotalStudyTime[0].func;
export const calcMathTotalStudyTime = calcSubjectTotalStudyTime[1].func;
export const calcSocialstudyTotalStudyTime = calcSubjectTotalStudyTime[2].func;
export const calcScienceTotalStudyTime = calcSubjectTotalStudyTime[3].func;
export const calcEnglishTotalStudyTime = calcSubjectTotalStudyTime[4].func;
