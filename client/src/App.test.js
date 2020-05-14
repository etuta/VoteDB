import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import EmailBar from "./components/EmailBar.js";
import Location from "./components/Location.js";
import MapBar from "./components/MapBar.js";
import SearchBar from "./components/SearchBar.js";
import { mount } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App rendering tests", () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  describe("App component initial content", () => {
    test("Contains an Location component", () => {
      expect(app).toContainExactlyOneMatchingElement(Location);
    });
    test("Contains an MapBar component", () => {
      expect(app).toContainExactlyOneMatchingElement(MapBar);
    });
    test("Contains an SearchBar component", () => {
      expect(app).toContainExactlyOneMatchingElement(SearchBar);
    });
    test("Does not display EmailBar on start up", () => {
      expect(app).toContainExactlyOneMatchingElement(EmailBar);
    });
  });
});
