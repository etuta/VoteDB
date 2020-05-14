import React from "react";
import { mount } from "enzyme";
import EmailBar from "./EmailBar.js";

describe("SearchBar features and PropTypes", () => {
  describe("PropTypes", () => {
    test("Has PropTypes defined", () => {
      expect(EmailBar).toHaveProperty("propTypes");
    });
  });

  describe("EmailBar initialization and components", () => {
    let emailBar;
    beforeEach(() => {
      emailBar = mount(<EmailBar />);
    });

    test("EmailBar is rendered", () => {
      expect(emailBar).toHaveLength(1);
    });

    test("EmailBar has two input fields and one textarea field", () => {
      expect(emailBar).toContainMatchingElement('input[name="name"]');
      expect(emailBar).toContainMatchingElement('input[name="email"]');
      expect(emailBar).toContainMatchingElement('textarea[name="message"]');
    });

    test("EmailBar has input[name='name'], input[name='email'] and textarea[name='message'] with values", () => {
      const nameInput = emailBar.find('input[name="name"]');
      expect(nameInput).toHaveProp("value");
      expect(nameInput.prop("value")).toBeFalsy();

      const emailInput = emailBar.find('input[name="email"]');
      expect(emailInput).toHaveProp("value");
      expect(emailInput.prop("value")).toBeFalsy();

      const addressInput = emailBar.find('textarea[name="message"]');
      expect(addressInput).toHaveProp("value");
      expect(addressInput.prop("value")).toBeFalsy();
    });

    test("EmailBar has one 'reach out' button and one 'submit' button", () => {
      expect(emailBar.find("button")).toHaveLength(2);
      expect(emailBar.find('button[className="emailButton"]').exists()).toBe(
        true
      );
      expect(emailBar.find('button[className="submitButton"]').exists()).toBe(
        true
      );
    });

    test("The 'submit' button is disabled if message is empty", () => {
      const submitButton = emailBar.find('button[className="submitButton"]');
      expect(submitButton.prop("disabled")).toBeTruthy();
    });

    test("Clicking the 'reach out' button opens up the Modal Box", () => {
      const reachOutButton = emailBar.find('button[className="emailButton"]');
      expect(emailBar.find("Modal").prop("show")).toBe(false);
      reachOutButton.simulate("click");
      //Modal Box is opened
      expect(emailBar.find("Modal").prop("show")).toBe(true);
    });

    test("Clicking 'Leave' link closes the Modal Box", () => {
      //Opening the Modal Box
      const reachOutButton = emailBar.find('button[className="emailButton"]');
      reachOutButton.simulate("click");
      expect(emailBar.find("Modal").prop("show")).toBe(true);

      const leaveLink = emailBar.find('a[href="#Modal"]');
      leaveLink.simulate("click");
      //Modal Box is closed
      expect(emailBar.find("Modal").prop("show")).toBe(false);
    });

    describe("Table rendering tests", () => {
      test("Table, tbody and tr are present", () => {
        expect(emailBar).toContainMatchingElement('table[className="table"]');
        expect(emailBar).toContainMatchingElement("tbody");
        expect(emailBar).toContainMatchingElement("tr");
      });

      test("Only one table is rendered", () => {
        //Only one table is rendered
        expect(emailBar.find("table").length).toEqual(1);
      });

      test("Table headings are rendered", () => {
        //Two Headings
        expect(emailBar.find("tbody").find("td").length).toEqual(2);
      });
    });
  });
});
