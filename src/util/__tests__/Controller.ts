import { pickKV, pickStartTimeFinishTime } from "../Controller";
import { convertUnixTime } from "../DateUtil";

describe("Controller.ts", () => {
  const studyLogs = [
    {
      id: 1,
      subject: "国語",
      startTime: "2022-02-15T15:00",
      finishTime: "2022-02-15T16:00",
    },
    {
      id: 2,
      subject: "数学",
      startTime: "2022-02-15T15:00",
      finishTime: "2022-02-15T15:30",
    },
    {
      id: 3,
      subject: "社会",
      startTime: "2022-02-15T15:00",
      finishTime: "2022-02-15T15:35",
    },
  ];

  describe("startTimeとfinishTimeをフィルター", () => {
    it("studyLogに対して", () => {
      const studyLog_KeyValue = [
        ["id", 1],
        ["subject", "国語"],
        ["startTime", "2022-02-15T15:00"],
        ["finishTime", "2022-02-15T16:00"],
      ];

      const returnedValue = studyLog_KeyValue.filter(pickStartTimeFinishTime);

      expect(returnedValue).toEqual([
        ["startTime", "2022-02-15T15:00"],
        ["finishTime", "2022-02-15T16:00"],
      ]);
    });

    it("studyLogの配列に対して", () => {
      const studyLogs_KeyValue = [
        [
          ["id", 1],
          ["subject", "国語"],
          ["startTime", "2022-02-15T15:00"],
          ["finishTime", "2022-02-15T16:00"],
        ],
        [
          ["id", 2],
          ["subject", "数学"],
          ["startTime", "2022-02-15T15:00"],
          ["finishTime", "2022-02-15T16:00"],
        ],
        [
          ["id", 3],
          ["subject", "社会"],
          ["startTime", "2022-02-15T15:00"],
          ["finishTime", "2022-02-15T16:00"],
        ],
      ];

      const returnedValue = studyLogs_KeyValue.map((studyLog_kv) =>
        studyLog_kv.filter(pickStartTimeFinishTime)
      );

      expect(returnedValue).toEqual([
        [
          ["startTime", "2022-02-15T15:00"],
          ["finishTime", "2022-02-15T16:00"],
        ],
        [
          ["startTime", "2022-02-15T15:00"],
          ["finishTime", "2022-02-15T16:00"],
        ],
        [
          ["startTime", "2022-02-15T15:00"],
          ["finishTime", "2022-02-15T16:00"],
        ],
      ]);
    });
  });
});

it("KeyValue形式のISO文字列をUnixTimeに変換", () => {
  const time = [
    ["startTime", "2022-02-15T15:23"],
    ["finishTime", "2022-02-15T15:23"],
  ];
  const expectedResult = [1644906180000, 1644906180000];

  const returnedValue = time.map((arr) => {
    if (typeof arr[1] === "string") return convertUnixTime(arr[1]);
    else throw new Error();
  });

  expect(returnedValue).toEqual(expectedResult);
});

it("filterKVByKeys", () => {
  const keys = ["key1", "key2"];
  const filterK1K2 = pickKV(keys);

  const data = [
    ["key1", "value1"],
    [0, "value0"],
    ["key2", "value2"],
    ["key3", "value3"],
  ];

  expect(data.filter(filterK1K2)).toEqual([
    ["key1", "value1"],
    ["key2", "value2"],
  ]);
});
