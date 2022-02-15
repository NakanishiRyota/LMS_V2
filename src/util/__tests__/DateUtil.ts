import {
  ISOSRDBMtoUnixTime,
  millSecToMin,
  millSecToSec,
  secToMin,
} from "../DateUtil";

it("millSecToSec", () => {
  expect(millSecToSec(1000)).toBe(1);
  expect(millSecToSec(1)).toBe(0.001);
});

it("secToMin", () => {
  expect(secToMin(60)).toBe(1);
  expect(secToMin(1.8)).toBe(0.03);
});

it("millSecToMin", () => {
  expect(millSecToMin(60000)).toBe(1);
  expect(millSecToMin(1.8)).toBe(0.00003);
});

it("ISOSRDBMtoUnixTime", () => {
  expect(ISOSRDBMtoUnixTime("2022-02-15T15:23")).toBe(1644906180000);
});
