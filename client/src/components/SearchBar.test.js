import React from "react";
import { mount } from "enzyme";
import SearchBar from "./SearchBar.js";

describe("SearchBar features and PropTypes", () => {
  describe("PropTypes", () => {
    test("Has PropTypes defined", () => {
      expect(SearchBar).toHaveProperty("propTypes");
    });
  });

  describe("SearchBar initialization and components", () => {
    let searchBar;
    const selectCall = jest.fn();
    beforeEach(() => {
      searchBar = mount(<SearchBar select={selectCall} />);
    });

    test("SearchBar is rendered", () => {
      expect(searchBar).toHaveLength(1);
    });

    test("SearchBar has two input fields for search queries", () => {
      expect(searchBar.find("input")).toHaveLength(2);
    });

    test("SearchBar has input[type=text] with placeholder", () => {
      //Since there are two input fields with type = text
      expect(searchBar).toContainMatchingElement('input[type="text"]');
      const inputs = searchBar.find('input[type="text"]');

      const searchInput = inputs.find(
        'input[placeholder="Look up location..."]'
      );
      expect(searchInput).toHaveProp("placeholder");
      expect(searchInput.prop("value")).toBeFalsy();

      const personInput = inputs.find('input[placeholder="Look up person..."]');
      expect(personInput).toHaveProp("placeholder");
      expect(personInput.prop("value")).toBeFalsy();
    });

    test("SearchBar has two search buttons", () => {
      //There are two identical search buttons
      expect(searchBar.find("button")).toHaveLength(2);
      expect(searchBar.find("button").exists()).toBe(true);
    });

    test("Both search buttons are disabled if value is empty", () => {
      expect(
        searchBar.find('input[placeholder="Look up location..."]').prop("value")
      ).toBeFalsy();
      const locationButton = searchBar.find(
        'button[variant="Search location on the Map"]'
      );
      expect(locationButton.prop("disabled")).toBeTruthy();

      expect(
        searchBar.find('input[placeholder="Look up person..."]').prop("value")
      ).toBeFalsy();
      const personButton = searchBar.find(
        'button[variant="Search person on the Map"]'
      );
      expect(personButton.prop("disabled")).toBeTruthy();
    });

    test("Clicking search button to query location and/or person does not invoke callback", () => {
      //select is only called for location query when searchQuery exists
      //Currently, searchQuery is null
      const locationButton = searchBar.find(
        'button[variant="Search location on the Map"]'
      );
      locationButton.simulate("click");
      expect(selectCall).toHaveBeenCalledTimes(0);

      //The above is the same for person query (i.e. address exists)
      //Currently, address is null
      const personButton = searchBar.find(
        'button[variant="Search person on the Map"]'
      );
      personButton.simulate("click");
      expect(selectCall).toHaveBeenCalledTimes(0);
    });
  });
});
