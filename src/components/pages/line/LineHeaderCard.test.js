import React from "react";
import { shallow } from "enzyme";

import LineHeaderCard from "./LineHeaderCard";
import * as line from "./line.json";

let container;

it("renders without crashing", () => {
  container = shallow(<LineHeaderCard line={line} />);
});

it("render line number", () => {
  const content = "12";
  expect(container.contains(content)).toEqual(true);
})

it("render line name", () => {
  const content = "WENTWORTH";
  expect(container.contains(content)).toEqual(true);
})

it("render line opration time", () => {
  const content = "Opration Time: 6:51 ~ 19:12";
  expect(container.contains(content)).toEqual(true);
})

it("render line frequency", () => {
  const content = "Frequency: 24 ~ 328";
  expect(container.contains(content)).toEqual(true);
})