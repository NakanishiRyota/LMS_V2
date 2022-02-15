
const log = (a) => {
  console.log(a)
  return a
}

const identity = (a) => a
const convertUnixTime = (a) => parseInt(a)

const inThisWeek = (studyLogs) => {
  return studyLogs
  // studyLog[] == Array<studyLog>
    .map((studyLog) =>
      Object.entries(studyLog).
      // [key, value][] == Array<[k, v]> == [[id, 数値],[subject, 文字列], [starttime, 文字列], [finishTime, 文字列]]
      filter(([key, value]) => key === "startTime")
      // [key, value][] == Array<[k, v]> == [[starttime, 文字列]]
    )

  // [key, value][][] === Array<Array<[k,v]>> == [[[starttime, 文字列]],[[starttime, 文字列]],[[starttime, 文字列]] .... ]
    .flat()
  // [key, value][] === Array<[k,v]> == [[starttime, 文字列],[starttime, 文字列],[starttime, 文字列] .... ]

    .map(([key, value]) => {
      if (typeof value === "string") {
        return convertUnixTime(value);
      } else {
        throw new Error();
      }
    })
  // number[]
    .filter((x) => {
      return typeof x === "number";
    })
  // number[]
    .forEach((startUnixTime) => {
      if (
        nowUnixTime - startUnixTime >= -604800000 &&
        nowUnixTime - startUnixTime <= 604800000
      ) {
        return true;
      } else {
        return false;
      }
    });
  // return true;
};


const studyLogs = [
  {
    id: 1,
    subject: '国語',
    startTime: '000001',
    finishTime: '111111',
  },
  {
    id: 2,
    subject: '数学',
    startTime: '000002',
    finishTime: '111111',
  },
  {
    id: 3,
    subject: '社会',
    startTime: '000003',
    finishTime: '111111',
  }
]

console.log(inThisWeek(studyLogs))
