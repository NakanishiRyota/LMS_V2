import React, { useState } from "react";
import { InputLabel } from "../atoms/input/InputLabel";
import { Select } from "../molecules/Select";
import { nowTime } from "../../util/DateUtil";
import { studyLog } from "../../util/Controller";
import {
  calcTotalStudyTime,
  calcJapaneseTotalStudyTime,
  calcMathTotalStudyTime,
  calcEnglishTotalStudyTime,
  calcSocialstudyTotalStudyTime,
  calcScienceTotalStudyTime,
  calcThisWeekTotalStudyTime,
} from "../../util/Controller";
import { Table } from "../organisms/Table";

export const Form = () => {
  const defaultStudyLog = {
    id: 0,
    subject: "国語",
    startTime: nowTime,
    finishTime: nowTime,
  };
  const [studyLogs, setStudyLogs] = useState<studyLog[]>([]);
  const [newStudyLog, setNewStudyLog] = useState<studyLog>(defaultStudyLog);

  //newStudyLogをstudyLogsに追加
  const addStudyLogs = (newStudyLog: studyLog) => {
    setStudyLogs((studyLogs: studyLog[]): studyLog[] => {
      const returnValue = [...studyLogs];
      returnValue.push(newStudyLog);
      return returnValue;
    });
  };

  //記録するボタンを押して、newStudyLogをstudyLogsに追加
  const handleLogAdd = () => {
    addStudyLogs(newStudyLog);
  };

  //newStudyLogを更新
  const updateNewStudyLog = (newProp: any) => {
    setNewStudyLog((prev: studyLog) => ({
      ...prev,
      ...newProp,
    }));
  };

  //科目、開始時間、終了時間が変わった時の処理
   const handleChanges = [
     {
       func: function (event: any) {
         const subject = event.target.value as string;
         updateNewStudyLog({ subject: subject });
       },
     },
     {
       func: function (event: any) {
         const startTime = event.target.value as string;
         updateNewStudyLog({ startTime: startTime });
       },
     },
     {
       func: function (event: any) {
         const finishTime = event.target.value as string;
         updateNewStudyLog({ finishTime: finishTime });
       },
     },
   ];



  const totalStudyTime = calcTotalStudyTime(studyLogs);
  const japaneseStudyTime = calcJapaneseTotalStudyTime(studyLogs);
  const mathStudyTime = calcMathTotalStudyTime(studyLogs);
  const socialstudyStudyTime = calcSocialstudyTotalStudyTime(studyLogs);
  const scienceStudyTime = calcScienceTotalStudyTime(studyLogs);
  const englishStudyTime = calcEnglishTotalStudyTime(studyLogs);
  const weekStudyTime = calcThisWeekTotalStudyTime(studyLogs);
  // const monthStudyTime = someFuncition(studyLogs);

  
  return (
    <>
      <Table
        totalStudyTime={totalStudyTime}
        japaneseStudyTime={japaneseStudyTime}
        mathStudyTime={mathStudyTime}
        englishStudyTime={englishStudyTime}
        socialstudyStudyTime={socialstudyStudyTime}
        scienceStudyTime={scienceStudyTime}
        weekStudyTime={weekStudyTime}
      />
      <div className="px-4 py-4 m-4 w-80 sm:w-96">
        <form>
          <InputLabel title={"科目："} htmlFor={"subject"} />
          <Select
            id="subject"
            name="subject"
            onChange={handleChanges[0].func}
          />
          <br></br>
          <label htmlFor="startTime">開始時間：</label>
          <input
            value={newStudyLog.startTime}
            className="px-4 py-4"
            type="datetime-local"
            id="startTime"
            onChange={handleChanges[1].func}
          ></input>
          <br></br>
          <label htmlFor="endTime">終了時間：</label>
          <input
            value={newStudyLog.finishTime}
            className="px-4 py-4"
            type="datetime-local"
            id="endTime"
            onChange={handleChanges[2].func}
          ></input>
          <br></br>
          <input
            className="bg-red-300 px-4 py-2"
            type="button"
            value="記録する"
            onClick={handleLogAdd}
          />
        </form>
      </div>
    </>
  );
};
