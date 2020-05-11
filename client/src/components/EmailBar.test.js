import React from "react";
import { shallow } from "enzyme";

import Article from "./Article";
import { sampleArticles } from "../setupTests";

const [article] = sampleArticles;

const articleEditedDate = new Date(article.edited);

describe("Article tests", () => {
  describe("Article content tests", () => {
    let comp;
    beforeEach(() => {
      comp = shallow(<Article article={article} />);
    });

    test("Has title", () => {
      expect(
        comp.findWhere(n => n.type() && n.text() === article.title)
      ).toHaveLength(1);
    });

    test("Has extract", () => {
      expect(
        comp.findWhere(n => n.type() && n.text() === article.extract)
      ).toHaveLength(1);
    });

    test("Has date", () => {
      expect(
        comp.findWhere(
          n => n.type() && n.text() === articleEditedDate.toLocaleString()
        )
      ).toHaveLength(1);
    });
  });

  describe("PropTypes", () => {
    test("Has PropTypes defined", () => {
      expect(Article).toHaveProperty("propTypes");
    });
  });

  describe("Article CSS has been removed", () => {
    let comp;
    beforeEach(() => {
      comp = shallow(<Article article={article} />);
    });

    test("No longer has div#article", () => {
      expect(comp).not.toContainMatchingElement("div#article");
    });

    test("No longer has #article-title", () => {
      expect(comp).not.toContainMatchingElement("#article-title");
    });

    test("No longer has #article-text", () => {
      expect(comp).not.toContainMatchingElement("#article-text");
    });

    test("Has #article-timestamp", () => {
      expect(comp).not.toContainMatchingElement("#article-timestamp");
    });
  });
});

/* eslint-disable no-native-reassign */
import React from "react";
import { mount } from "enzyme";
import Editor from "./Editor";
import { findButton } from "../setupTests";

const sampleArticle = {
  title: "Cheyenne Mountain Complex",
  extract: "The Cheyenne Mountain Complex is a ...",
  edited: new Date("2016-12-10T14:54:40Z").toISOString()
};

describe("Editor Styled Components and PropTypes", () => {
  describe("PropTypes", () => {
    test("Has PropTypes defined", () => {
      // This is not a React "prop", but a JS property
      expect(Editor).toHaveProperty("propTypes");
    });
  });
});

describe("Editor test", () => {
  let _Date;
  beforeAll(() => {
    _Date = Date;
    const testDate = new Date("2018-1-1");
    Date = class extends Date {
      constructor() {
        return testDate;
      }
      static now() {
        return testDate.valueOf();
      }
    };
  });
  afterAll(() => {
    Date = _Date;
  });

  describe("New article", () => {
    let editor;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      editor = mount(<Editor complete={completeCallback} />);
    });

    test("Editor has input[type=text] with placeholder", () => {
      expect(editor).toContainExactlyOneMatchingElement('input[type="text"]');
      const titleInput = editor.find('input[type="text"]');
      expect(titleInput).toHaveProp("placeholder");
      expect(titleInput.prop("value")).toBeFalsy();
    });

    test("Editor has <textarea> with placeholder", () => {
      expect(editor).toContainExactlyOneMatchingElement("textarea");
      const extractInput = editor.find("textarea");
      expect(extractInput).toHaveProp("placeholder");
      expect(extractInput.prop("value")).toBeFalsy();
    });

    test("Editor has save button", () => {
      const button = findButton(editor, /save/i);
      expect(button.exists()).toBe(true);
    });

    test("Editor has cancel button", () => {
      const button = findButton(editor, /cancel/i);
      expect(button.exists()).toBe(true);
    });

    test("Save button is disabled if title is empty", () => {
      expect(editor.find('input[type="text"]').prop("value")).toBeFalsy();
      const button = findButton(editor, /save/i);
      expect(button.prop("disabled")).toBeTruthy();
    });

    test("Cancel button invokes callback", () => {
      const button = findButton(editor, /cancel/i);
      button.simulate("click");
      expect(completeCallback).toHaveBeenCalledTimes(1);
    });

    describe("New article save tests", () => {
      beforeEach(() => {
        const title = editor.find('input[type="text"]');
        title.simulate("change", {
          target: { value: sampleArticle.title }
        });
      });

      test("Save button is enabled if title is specified", () => {
        const button = findButton(editor, /save/i);
        expect(button.prop("disabled")).toBeFalsy();
      });

      test("Save button invokes callback", () => {
        const button = findButton(editor, /save/i);
        button.simulate("click");
        expect(completeCallback).toHaveBeenCalledWith({
          title: sampleArticle.title,
          extract: "",
          edited: new Date().toISOString()
        });
      });
    });
  });

  describe("Edit article", () => {
    let editor;
    const completeCallback = jest.fn();
    beforeEach(() => {
      completeCallback.mockReset();
      editor = mount(
        <Editor article={sampleArticle} complete={completeCallback} />
      );
    });

    test("Editor has input[type=text] with value", () => {
      expect(editor).toContainExactlyOneMatchingElement('input[type="text"]');
      const titleInput = editor.find('input[type="text"]');
      expect(titleInput).toHaveProp("value", sampleArticle.title);
    });

    test("Editor has <textarea> with placeholder", () => {
      expect(editor).toContainExactlyOneMatchingElement("textarea");
      const extractInput = editor.find("textarea");
      expect(extractInput).toHaveProp("value", sampleArticle.extract);
    });

    test("Save button invokes callback", () => {
      const button = findButton(editor, /save/i);
      button.simulate("click");
      expect(completeCallback).toHaveBeenCalledWith({
        title: sampleArticle.title,
        extract: sampleArticle.extract,
        edited: new Date().toISOString()
      });
    });
  });
});

import React from "react";
import { shallow, mount } from "enzyme";

import IndexBar, { IndexSections } from "./IndexBar";

import { sampleArticles } from "../setupTests";

const toSections = function articlesToSections(articles) {
  // Use set to "deduplicate" sections
  const sections = new Set();
  articles.forEach(article => {
    if (article.title) {
      sections.add(article.title[0].toUpperCase());
    }
  });
  // Return array of sorted section headers
  return Array.from(sections).sort();
};

describe("IndexBar Styled Components and PropTypes", () => {
  describe("PropTypes", () => {
    test("Has PropTypes defined", () => {
      expect(IndexBar).toHaveProperty("propTypes");
    });
  });

  describe("StyledComponents", () => {
    let indexBar;
    beforeEach(() => {
      indexBar = mount(
        <IndexBar
          collection={sampleArticles}
          select={jest.fn}
          currentArticle={null}
        />
      );
    });

    test("No longer has #section-list", () => {
      expect(indexBar).not.toContainMatchingElement("#section-list");
    });
  });
});

describe("IndexBar initialization", () => {
  test("Handles empty array without error", () => {
    shallow(<IndexBar collection={[]} select={jest.fn} />);
  });
});

describe("IndexBar title bar", () => {
  // We need to 'mount' instead of 'shallow' to ensure child components are rendered and
  // we can interact with the DOM. Use our mock callback to test it is invoked correctly.
  let listBar;

  beforeEach(() => {
    listBar = mount(<IndexBar collection={sampleArticles} select={jest.fn} />);
  });

  test("Renders sorted section list", () => {
    const sectionList = listBar.find(IndexSections).find("li");
    expect(sectionList.map(li => li.text())).toEqual(
      toSections(sampleArticles)
    );
  });
});

describe("IndexBar actions", () => {
  let selectCallback;
  let listBar;

  beforeEach(() => {
    // Create a mock select callback function
    selectCallback = jest.fn();

    // We need to 'mount' instead of 'shallow' to ensure child components are rendered and
    // we can interact with the DOM. Use our mock callback to test it is invoked correctly.
    listBar = mount(
      <IndexBar collection={sampleArticles} select={selectCallback} />
    );
  });

  test("Changes section on click", () => {
    // Find the section link
    const section = listBar.find("li").filterWhere(n => n.text() === "D");
    section.simulate("click");

    // Callback to clear article should have no arguments
    expect(selectCallback).toHaveBeenCalledWith();

    // Should be section labels list and section titles list
    const lists = listBar.find("ul");
    expect(lists).toHaveLength(2);

    // Grab titles list
    const titleList = lists.at(1);
    expect(titleList.children().map(li => li.text())).toEqual([
      "Daleks",
      "Dominators"
    ]);
  });

  test("Shows article on click", () => {
    const article = sampleArticles[0];
    const section = listBar
      .find("li")
      .filterWhere(n => n.text() === article.title[0].toUpperCase());
    section.simulate("click");

    // Click an article title
    const title = listBar
      .find("li")
      .filterWhere(n => n.text() === article.title);
    title.simulate("click");

    // We should have two callbacks, first with no argument on selecting C to clear
    // article and then selecting the specific article
    expect(selectCallback).toHaveBeenLastCalledWith(article);
  });

  test("Clears article when another section is clicked", () => {
    const section1 = listBar.find("li").filterWhere(n => n.text() === "C");
    section1.simulate("click");

    // Click another section
    const section2 = listBar.find("li").filterWhere(n => n.text() === "A");
    section2.simulate("click");

    // We should have callback with no arguments
    expect(selectCallback).toHaveBeenLastCalledWith();
  });
});
