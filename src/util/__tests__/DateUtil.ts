import React from "react";
import { year, month, day, hour, minute } from "../DateUtil";

it("confirmdateFormat", () => {
    expect(year).toBe("2022");
    expect(month).toBe("02");
    expect(day).toBe("13");
    expect(hour).toBe("17")
})