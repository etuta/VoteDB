import React, { useState, useEffect, useRef, Component } from "react";
// import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card'
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { Map, GoogleApiWrapper } from "google-maps-react";
//import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

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

import { MDBCol, MDBInput } from "mdbreact";
const Button = styled.button``;

const mapStyles = {
  width: "100%",
  height: "100%"
};

/* const MapContainer =  (props) => {
       return (<Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />);
    }; */

const App = () => {
  const [target, setTarget] = useState(null);
  const [dropdownOpen, setOpen] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState("");

  const toggle = dropdown => setCurrentDropdown(dropdown);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("view");

  //  const target = useRef(null);
  const ref = useRef(null);

  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <Container>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Voter App</h1>
        </header>

        <p className="App-intro">Main page of the app</p>
        <>
          <Row>
            <MDBCol md="8">
              <input
                className="form-control"
                type="text"
                placeholder="Search by Location"
                aria-label="Search location"
              />
            </MDBCol>
            <button
              onClick={handleClick}
              margin-right="40px"
              variant="Search on the Map"
            >
              Select location on the Map
            </button>{" "}
            <button
              onClick={() => {
                setMode("filter");
              }}
              margin-left="400px"
              variant="Search by Filters:"
            >
              {" "}
              Search by Filters{" "}
            </button>{" "}
          </Row>

          {mode === "filter" && (
            <Row margin-top="100px">
              <Col sm={{ size: "auto", offset: 8 }}>
                <ListGroup>
                  <ButtonDropdown
                    isOpen={currentDropdown === "1"}
                    toggle={setCurrentDropdown.bind(this, "1")}
                  >
                    <DropdownToggle caret>Party Affiliation</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Democrat</DropdownItem>
                      <DropdownItem>Republican</DropdownItem>
                      <DropdownItem>Independent</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown
                    isOpen={currentDropdown === "2"}
                    toggle={setCurrentDropdown.bind(this, "2")}
                  >
                    <DropdownToggle caret>Registration Status</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem> Registered </DropdownItem>
                      <DropdownItem>Not Registered </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown
                    isOpen={currentDropdown === "3"}
                    toggle={setCurrentDropdown.bind(this, "3")}
                  >
                    <DropdownToggle caret>Age Range</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem> 18-25 </DropdownItem>
                      <DropdownItem> 25-35 </DropdownItem>
                      <DropdownItem> 35-50 </DropdownItem>
                      <DropdownItem> 50-70 </DropdownItem>
                      <DropdownItem> 70-90 </DropdownItem>
                      <DropdownItem> 90+ </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown
                    isOpen={currentDropdown === "4"}
                    toggle={setCurrentDropdown.bind(this, "4")}
                  >
                    <DropdownToggle caret> Race </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        {" "}
                        American Indian or Alaska Native{" "}
                      </DropdownItem>
                      <DropdownItem> Asian </DropdownItem>
                      <DropdownItem> Black or African American </DropdownItem>
                      <DropdownItem> Hispanic or Latino </DropdownItem>
                      <DropdownItem>
                        {" "}
                        Native Hawaiian or Other Pacific Islander{" "}
                      </DropdownItem>
                      <DropdownItem> White </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown
                    isOpen={currentDropdown === "5"}
                    toggle={setCurrentDropdown.bind(this, "5")}
                  >
                    <DropdownToggle caret>
                      {" "}
                      Socioeconomic status{" "}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem> Low </DropdownItem>
                      <DropdownItem> Medium </DropdownItem>
                      <DropdownItem> High </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ListGroup>
              </Col>
            </Row>
          )}
        </>
      </div>
    </Container>
  );
};

export default App;
