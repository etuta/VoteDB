import React from "react";
import { mount } from "enzyme";
import MapBar from "./MapBar.js";

const latitude = 54.526;
const longitude = -105.2551;
const zoom = 3;

describe("MapBar components and PropTypes", () => {
  describe("PropTypes", () => {
    test("Has PropTypes defined", () => {
      expect(MapBar).toHaveProperty("propTypes");
    });
  });

  describe("MapBar initialization", () => {
    test("Handles empty jest.fn function without error", () => {
      mount(
        <MapBar
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          select={jest.fn}
        />
      );
    });
  });

  describe("MapBar rendering", () => {
    let map;
    const selectCall = jest.fn();
    beforeEach(() => {
      map = mount(
        <MapBar
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          select={selectCall}
        />
      );
    });

    test("Cannot get zoom without reference", () => {
      expect(map.find("Map").prop("zoom")).toEqual(zoom);
    });

    test("Cannot get latitude and longitude without reference", () => {
      expect(map.find("Map").prop("center")).toEqual([latitude, longitude]);
    });

    test("Without a mouse click, selectCall has not be called", () => {
      expect(selectCall).toHaveBeenCalledTimes(0);
    });

    describe("Location (i.e. LocateUser) tests", () => {
      test("Location is initialized", () => {
        expect(map.find("Map").find("Location"));
      });
    });
  });
});
