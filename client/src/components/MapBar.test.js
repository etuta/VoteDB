import React from "react";
import { shallow, mount } from "enzyme";
import MapBar from "./MapBar.js";

// import Location from "./Location.js";
//
// import { useEffect } from "react";
// import { withLeaflet } from "react-leaflet";
// import Locate from "leaflet.locatecontrol";

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
    beforeEach(() => {
      //Do the tests in context of MapBar
      map = mount(
        <MapBar
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          select={jest.fn}
        />
      );
    });

    test("Map is centered around given latitude and longitude", () => {
      map.getCenter();
    });

    test("Map zoom is set at given zoom", () => {});
  });
});

//
// let listBar;
//
// beforeEach(() => {
//   listBar = mount(<IndexBar collection={sampleArticles} select={jest.fn} />);
// });
//
// test('Renders sorted section list', () => {
//   const sectionList = listBar.find(IndexSections).find('li');
//   expect(sectionList.map(li => li.text())).toEqual(
//     toSections(sampleArticles)
//   );
// });
// });

// test('Renders sorted section list', () => {
//   const sectionList = listBar.find(IndexSections).find('li');
//   expect(sectionList.map(li => li.text())).toEqual(
//     toSections(sampleArticles)
//   );
// });
//
// describe('IndexBar actions', () => {
//   let selectCallback;
//   let listBar;
//
//   beforeEach(() => {
//     // Create a mock select callback function
//     selectCallback = jest.fn();
//
//     // We need to 'mount' instead of 'shallow' to ensure child components are rendered and
//     // we can interact with the DOM. Use our mock callback to test it is invoked correctly.
//     listBar = mount(
//       <IndexBar collection={sampleArticles} select={selectCallback} />
//     );
//   });
//
// });
//
// });

// describe("MapBar initialization", () => {
//
//   test("Handles undefined filler function without error", () => {
//       mount(
//         <MapBar
//           latitude={latitude}
//           longitude={longitude}
//           zoom={zoom}
//           select={jest.fn}
//         />
//       );
//     });
//   });

// test("map default options", function( assert )
//              assert.equal(myMap.getCenter().toString(),
//             "LatLng(0, 8.846)",
//             "The map is centered at the ZMT's longitude, and the equator"
//     );
//     assert.equal(myMap.getZoom(),
//             2,
//             "The default zoom is set to 2"
//     );
// });
//
// QUnit.test("baseLayer layerGroup", function( assert ) {
//     assert.equal(baseLayer.getLayers().length,
//             1,
//             "There is just one layer in 'baseLayer' layerGroup"
//     );
//     assert.equal(baseLayer.getLayers()[0]._url,
//             "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//             "The url of the layer leads to the correct openstreet map tiles"
//     );
//
//     assert.equal(baseLayer.getLayers()[0].options.attribution,
//             '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//             "The attribution for the layer is correct"
//     );
//     assert.equal(baseLayer.getLayers()[0].options.minZoom,
//             0,
//             "The default minimum zoom is set to 0"
//     );
//     assert.equal(baseLayer.getLayers()[0].options.maxZoom,
//             19,
//             "The default maximum zoom is set to 19"
//     );
// });
// let locationBar;
// const testInput = {
//   position: "topright",
//   strings: {
//     title: "Go to location"
//   },
//     onActivate: () => {}
// };
//
//     describe('StyledComponents', () => {
//       let indexBar;
//
//
//       test('No longer has #section-list', () => {
//         expect(indexBar).not.toContainMatchingElement('#section-list');
//       });
//     });
//   });
//
//   describe('IndexBar initialization', () => {
//     test('Handles empty array without error', () => {
//       shallow(<IndexBar collection={[]} select={jest.fn} />);
//     });
//   });
//
//   describe('IndexBar title bar', () => {
//     // We need to 'mount' instead of 'shallow' to ensure child components are rendered and
//     // we can interact with the DOM. Use our mock callback to test it is invoked correctly.
//     let listBar;
//
//     beforeEach(() => {
//       listBar = mount(<IndexBar collection={sampleArticles} select={jest.fn} />);
//     });
//
//     test('Renders sorted section list', () => {
//       const sectionList = listBar.find(IndexSections).find('li');
//       expect(sectionList.map(li => li.text())).toEqual(
//         toSections(sampleArticles)
//       );
//     });
//   });
//
//   describe('IndexBar actions', () => {
//     let selectCallback;
//     let listBar;
//
//     beforeEach(() => {
//       // Create a mock select callback function
//       selectCallback = jest.fn();
//
//       // We need to 'mount' instead of 'shallow' to ensure child components are rendered and
//       // we can interact with the DOM. Use our mock callback to test it is invoked correctly.
//       listBar = mount(
//         <IndexBar collection={sampleArticles} select={selectCallback} />
//       );
//     });
//
//     test('Changes section on click', () => {
//       // Find the section link
//       const section = listBar.find('li').filterWhere(n => n.text() === 'D');
//       section.simulate('click');
//
//       // Callback to clear article should have no arguments
//       expect(selectCallback).toHaveBeenCalledWith();
//
//       // Should be section labels list and section titles list
//       const lists = listBar.find('ul');
//       expect(lists).toHaveLength(2);
//
//       // Grab titles list
//       const titleList = lists.at(1);
//       expect(titleList.children().map(li => li.text())).toEqual([
//         'Daleks',
//         'Dominators'
//       ]);
//     });
//
//     test('Shows article on click', () => {
//       const article = sampleArticles[0];
//       const section = listBar
//         .find('li')
//         .filterWhere(n => n.text() === article.title[0].toUpperCase());
//       section.simulate('click');
//
//       // Click an article title
//       const title = listBar
//         .find('li')
//         .filterWhere(n => n.text() === article.title);
//       title.simulate('click');
//
//       // We should have two callbacks, first with no argument on selecting C to clear
//       // article and then selecting the specific article
//       expect(selectCallback).toHaveBeenLastCalledWith(article);
//     });
//
//     test('Clears article when another section is clicked', () => {
//       const section1 = listBar.find('li').filterWhere(n => n.text() === 'C');
//       section1.simulate('click');
//
//       // Click another section
//       const section2 = listBar.find('li').filterWhere(n => n.text() === 'A');
//       section2.simulate('click');
//
//       // We should have callback with no arguments
//       expect(selectCallback).toHaveBeenLastCalledWith();
//     });
//   });
//
//
//   // test("Has a title", () => {
//   //   expect(locationBar).toContainMatchingElement("")
//   // });
//   //
//   // test("Has a position", () => {
//   //   expect(locationBar).toContainMatchingElement("")
//   // });
//   //
//   // test("Should return user's location", () => {
//   //
//   //   const testLocationFunction = props => {
//   //     useEffect(() => {
//   //       const { options } = props;
//   //       const { map } = props.leaflet;
//   //
//   //       const myLocation = new Locate(options);
//   //       myLocation.addTo(map);
//   //       // eslint-disable-next-line react-hooks/exhaustive-deps
//   //     }, []);
//   //
//   //     return null;
//   //   };
//   //
//   //   const output = shallow(<testLocationFunction options={testInput} />);
//   //   expect(locationBar).toEqual(output);
//   // });
// });
