import React, { useState, useEffect, useRef } from "react";
// import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card'
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
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

const App = () => {
  const [target, setTarget] = useState(null);
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [show, setShow] = useState(false);
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
            <MDBCol md="6">
              <input
                className="form-control"
                type="text"
                placeholder="Search by Location"
                aria-label="Search location"
              />
            </MDBCol>
            <Button
              onClick={handleClick}
              margin-right="40px"
              variant="Search on the Map"
            >
              Select on the Map
            </Button>{" "}
            &nbsp;
            <Button
              onClick={handleClick}
              margin-left="400px"
              variant="Search by Filters:"
            >
              {" "}
              Search by Filters{" "}
            </Button>{" "}
            <Col></Col>
          </Row>

          <Row>
            <Col sm={{ size: "auto", offset: 9 }}>
              <ListGroup>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret>Party Affiliation</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Democrat</DropdownItem>
                    <DropdownItem>Republican</DropdownItem>
                    <DropdownItem>Independent</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ListGroup>
            </Col>
          </Row>
        </>
      </div>
    </Container>
  );
};

export default App;
