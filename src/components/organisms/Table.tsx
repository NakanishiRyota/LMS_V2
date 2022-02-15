import React from "react";
export type tableProps = {
  totalStudyTime: number;
  monthStudyTime: number;
  weekStudyTime: number;
  japaneseStudyTime: number;
  mathStudyTime: number;
  englishStudyTime: number;
  socialstudyStudyTime: number;
  scienceStudyTime: number;
};

export const Table: React.FC<tableProps> = (props) => {
  const { totalStudyTime, japaneseStudyTime, mathStudyTime, englishStudyTime, socialstudyStudyTime, scienceStudyTime, weekStudyTime, monthStudyTime} = props;
  return (
    <div className="mx-10 my-10 w-80 sm:w-1/2">
      <table className="table-auto text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">今週の学習時間</th>
            <th className="border px-4 py-2">今月の学習時間</th>
            <th className="border px-4 py-2">合計学習時間</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{weekStudyTime}min</td>
            <td className="border px-4 py-2">{monthStudyTime}min</td>
            <td className="border px-4 py-2">{totalStudyTime}min</td>
          </tr>
          <tr className="bg-gray-100">
            <td colSpan={2} className="border px-4 py-2">
              国語
            </td>
            <td className="border px-4 py-2">{japaneseStudyTime}min</td>
          </tr>
          <tr>
            <td colSpan={2} className="border px-4 py-2">
              数学
            </td>
            <td className="border px-4 py-2">{mathStudyTime}min</td>
          </tr>
          <tr className="bg-gray-100">
            <td colSpan={2} className="border px-4 py-2">
              英語
            </td>
            <td className="border px-4 py-2">{englishStudyTime}min</td>
          </tr>
          <tr>
            <td colSpan={2} className="border px-4 py-2">
              社会
            </td>
            <td className="border px-4 py-2">{socialstudyStudyTime}min</td>
          </tr>
          <tr className="bg-gray-100">
            <td colSpan={2} className="border px-4 py-2">
              理科
            </td>
            <td className="border px-4 py-2">{scienceStudyTime}min</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
