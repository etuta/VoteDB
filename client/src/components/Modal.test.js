import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import Modal from "./Modal.js";

describe("Modal components and PropTypes", () => {
  describe("PropTypes", () => {
    test("Has PropTypes defined", () => {
      expect(Modal).toHaveProperty("propTypes");
    });
  });

  describe("Modal initialization", () => {
    let modalBox;
    beforeEach(() => {
      modalBox = mount(<Modal handleClose={jest.fn()} show={true} />);
    });

    test("Modal Box is rendered", () => {
      expect(modalBox.length).toEqual(1);
    });

    test("Renders HTML elements", () => {
      //Tests if modalContent element has 0 html children elements
      //children was not passed in as a prop for modalBox
      expect(modalBox.find("modalContent").length).toEqual(0);
      expect(modalBox.find("modalContent").children()).toHaveLength(0);
    });

    test("Modal Box 'Leave' text is rendered", () => {
      expect(modalBox.text()).toEqual("Leave");
    });

    test("Calling Modal renders a modal box; handles empty jest.fn function without error", () => {
      mount(<Modal handleClose={jest.fn()} show={true} />);
    });
  });

  describe("Modal rendering and components", () => {
    let modalBox;
    let input = [1, 2, 3];
    const handleClose = jest.fn();
    beforeEach(() => {
      modalBox = mount(
        <Modal handleClose={handleClose} show={true} children={input}>
          Modal Test <p></p>
        </Modal>
      );
    });

    test("Renders HTML elements", () => {
      //Renders children
      expect(modalBox.find("modalContent").children());
    });

    test("Updated text is rendered appropriately", () => {
      expect(modalBox.text()).toEqual("Modal Test Leave");
    });

    test("Modal closes when 'Leave' is clicked", () => {
      expect(modalBox.find("Modal").prop("show")).toBe(true);
      const leaveLink = modalBox.find('a[href="#Modal"]');
      leaveLink.simulate("click");
      //handleClose is called
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test("Modal stays open unless 'Leave' is clicked", async () => {
      const handleClose = jest.fn();
      const root = document.createElement("div");
      ReactDOM.render(<Modal handleClose={handleClose} show={true} />, root);

      const events = new MouseEvent("click");
      document.dispatchEvent(events);
      //Because Leave isn't clicked, Modal does not close
      expect(handleClose).toHaveBeenCalledTimes(0);
    });
  });
});
