import React from "react";
import ReactDOM from "react-dom";

import Location from "./Location.js";

import { useEffect } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";
import { shallow, mount } from "enzyme";

describe("Location function tests", () => {
  // let locationBar;
  //
  // const testInput = {
  //   position: "topright",
  //   strings: {
  //     title: "Go to location"
  //   },
  //     onActivate: () => {}
  // };
  //
  // beforeEach(() => {
  //   //mount MapBar. Do the tests in context of MapBar
  //   locationBar = mount(<Location options={testInput} map={react.leaflet} />);
  // });
  //
  // test("Has PropTypes defined", () => {
  //   expect(locationBar).toHaveProperty("propTypes");
  // });
  //
  // test("Has a title", () => {
  //   expect(locationBar).toContainMatchingElement("")
  // });
  //
  // test("Has a position", () => {
  //   expect(locationBar).toContainMatchingElement("")
  // });
  //
  // test("Should return user's location", () => {
  //
  //   const testLocationFunction = props => {
  //     useEffect(() => {
  //       const { options } = props;
  //       const { map } = props.leaflet;
  //
  //       const myLocation = new Locate(options);
  //       myLocation.addTo(map);
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //     }, []);
  //
  //     return null;
  //   };
  //
  //   const output = shallow(<testLocationFunction options={testInput} />);
  //   expect(locationBar).toEqual(output);
  // });
});
