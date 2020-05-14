/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { filterStyle } from "./UIDesign";

export default function VotersFilters({
  registrationFilter,
  setRegistrationFilter,
  ageRangeFilter,
  setAgeRangeFilter,
  raceFilter,
  setRaceFilter,
  socioeconomicFilter,
  setSocioeconomicFilter,
  partyFilter,
  setPartyFilter
}) {
  const [show, setShow] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState("");
  const [mode, setMode] = useState("view");

  const toggle = dropdown => setCurrentDropdown(dropdown);

  return (
    <div className="searchField">
      <Row margin-top="100px">
        <h3 style={filterStyle}>Select Filters</h3>
        <Col sm={{ size: "auto", offset: 8 }}>
          <ListGroup>
            <ButtonDropdown
              isOpen={currentDropdown === "1"}
              toggle={setCurrentDropdown.bind(this, "1")}
            >
              <DropdownToggle caret>Party Affiliation</DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setPartyFilter("Democrat");
                  }}
                >
                  Democrat
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setPartyFilter("Republican");
                  }}
                >
                  Republican
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setPartyFilter("Independent");
                  }}
                >
                  Independent
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>

            <ButtonDropdown
              isOpen={currentDropdown === "2"}
              toggle={setCurrentDropdown.bind(this, "2")}
            >
              <DropdownToggle caret>Registration Status</DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setRegistrationFilter(1);
                  }}
                >
                  {" "}
                  Registered{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setRegistrationFilter(0);
                  }}
                >
                  Not Registered{" "}
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>

            <ButtonDropdown
              isOpen={currentDropdown === "3"}
              toggle={setCurrentDropdown.bind(this, "3")}
            >
              <DropdownToggle caret>Age Range</DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setAgeRangeFilter({ min: 18, max: 24 });
                  }}
                >
                  {" "}
                  18-25{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setAgeRangeFilter({ min: 25, max: 34 });
                  }}
                >
                  {" "}
                  25-35{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setAgeRangeFilter({ min: 35, max: 49 });
                  }}
                >
                  {" "}
                  35-50{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setAgeRangeFilter({ min: 50, max: 69 });
                  }}
                >
                  {" "}
                  50-70{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setAgeRangeFilter({ min: 70, max: 89 });
                  }}
                >
                  {" "}
                  70-90{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setAgeRangeFilter({ min: 90, max: 110 });
                  }}
                >
                  {" "}
                  90-110{" "}
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>

            <ButtonDropdown
              isOpen={currentDropdown === "4"}
              toggle={setCurrentDropdown.bind(this, "4")}
            >
              <DropdownToggle caret> Race </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setRaceFilter("Native");
                  }}
                >
                  {" "}
                  American Indian or Alaska Native{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setRaceFilter("Asian");
                  }}
                >
                  {" "}
                  Asian{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setRaceFilter("Black");
                    console.log(raceFilter);
                  }}
                >
                  {" "}
                  Black or African American{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setRaceFilter("Latino");
                  }}
                >
                  {" "}
                  Hispanic or Latino{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setRaceFilter("Native Hawaiian or Other Pacific Islander");
                  }}
                >
                  {" "}
                  Native Hawaiian or Other Pacific Islander{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setRaceFilter("White");
                  }}
                >
                  {" "}
                  White{" "}
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>

            <ButtonDropdown
              isOpen={currentDropdown === "5"}
              toggle={setCurrentDropdown.bind(this, "5")}
            >
              <DropdownToggle caret> Socioeconomic status </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setSocioeconomicFilter("lower");
                  }}
                >
                  {" "}
                  Low{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSocioeconomicFilter("mid");
                  }}
                >
                  {" "}
                  Medium{" "}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSocioeconomicFilter("upper");
                  }}
                >
                  {" "}
                  High{" "}
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
