/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Row, Form, FormGroup, Input, Label } from "reactstrap";
import Modal from "./Modal.js";
import { emailStyle } from "./UIDesign.js";
import emailjs from "emailjs-com";
import PropTypes from "prop-types";

function EmailBar() {
  const [modal, setModal] = useState(false);
  const [selectedVoters, setSelectedVoters] = useState([]);
  const [highlight, setHighlight] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const [namesArray, setNamesArray] = useState([]);
  const [addressArray, setAddressArray] = useState([]);

  const [doubleClick, setDoubleClick] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/voters/")
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then(data => {
          setSelectedVoters(data);
        })
        .catch(err => console.log(err)); // eslint-disable-line no-console
    };
    fetchData();
  }, []);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
    handleReset();
  };

  const getContactInfo = array => {
    const output = [];
    for (var i = 0; i < array.length; i++) {
      output.push([array[i].name, array[i].email]);
    }
    return output;
  };

  const tableRows = getContactInfo(selectedVoters);

  const fetchUserClick = click => {
    if (!highlight) {
      setHighlight(true);
    }

    let voterName = click.target.getAttribute("voter-title").split(",")[0];
    let voterAddress = click.target.getAttribute("voter-title").split(",")[1];

    if (voterName === name) {
      setDoubleClick(true);
    } else {
      setDoubleClick(false);
    }

    setName(voterName);
    setAddress(voterAddress);

    if (namesArray.includes(voterName)) {
      const updatedNamesArray = namesArray;
      updatedNamesArray.splice(updatedNamesArray.indexOf(voterName), 1);
      setNamesArray(updatedNamesArray);

      const updatedAddressArray = addressArray;
      updatedAddressArray.splice(updatedAddressArray.indexOf(voterAddress), 1);
      setAddressArray(updatedAddressArray);
    } else {
      const updatedNamesArray = namesArray;
      updatedNamesArray.push(voterName);
      setNamesArray(updatedNamesArray);

      const updatedAddressArray = addressArray;
      updatedAddressArray.push(voterAddress);
      setAddressArray(updatedAddressArray);
    }

    if (namesArray.length > 5) {
      alert("You can only choose 5 voters");
      setHighlight(false);
      handleReset();
    }
  };

  const handleReset = () => {
    setName("");
    setAddress("");
    setMessage("");
    setNamesArray([]);
    setAddressArray([]);
  };

  const tableData = () => {
    if (!highlight) {
      return tableRows.map((voter, index) => {
        return (
          <tr
            key={index}
            voter-item={voter}
            onClick={click => fetchUserClick(click)}
          >
            <td className="cell" voter-title={voter}>
              {voter[0]}
            </td>
            <td className="cell" voter-title={voter}>
              {voter[1]}
            </td>
          </tr>
        );
      });
    } else {
      return tableRows.map((voter, index) => {
        if (namesArray.includes(voter[0])) {
          return (
            <tr
              key={index}
              voter-item={voter}
              onClick={click => fetchUserClick(click)}
            >
              <td className="cell-highlight" voter-title={voter}>
                {voter[0]}
              </td>
              <td className="cell-highlight" voter-title={voter}>
                {voter[1]}
              </td>
            </tr>
          );
        } else {
          return (
            <tr
              key={index}
              voter-item={voter}
              onClick={click => fetchUserClick(click)}
            >
              <td className="cell" voter-title={voter}>
                {voter[0]}
              </td>
              <td className="cell" voter-title={voter}>
                {voter[1]}
              </td>
            </tr>
          );
        }
      });
    }
  };

  const tableHeadings = () => {
    return (
      <tr>
        <td className="headings">{"Name"}</td>
        <td className="headings">{"Email Address"}</td>
      </tr>
    );
  };

  const handleNameDisplay = () => {
    const displayNames = [...namesArray];
    let outputNames = [...new Set(displayNames)].join(", ");
    return outputNames;
  };

  const handleAddressDisplay = () => {
    const displayAddresses = [...addressArray];
    let outputAddresses = [...new Set(displayAddresses)].join(", ");
    return outputAddresses;
  };

  const handleSend = e => {
    e.preventDefault();

    for (var i = 0; i < addressArray.length; i++) {
      let recipientEmail = addressArray[i];
      let recipientName = namesArray[i];

      var params = {
        email: recipientEmail,
        name: recipientName,
        message: message
      };

      emailjs.send(
        "contact_service",
        "contact_form",
        params,
        "user_C9EJhitygT2N6VxxaQJTE"
      );
    }

    alert("Successfully sent");
    handleModalClose();
  };

  return (
    <div>
      <Row>
        <button
          className="emailButton"
          onClick={() => {
            handleModalOpen();
          }}
        >
          Reach out
        </button>{" "}
        <Modal show={modal} handleClose={e => handleModalClose(e)}>
          <h3 style={emailStyle}>Reach out</h3>
          <h5 style={emailStyle}>Scroll to select a voter</h5>
          <table className="table">
            <tbody>
              {tableHeadings()}
              {tableData()}
            </tbody>
          </table>
          <div className="emailField">
            <Form onSubmit={e => handleSend(e)} style={{ width: "400px" }}>
              <FormGroup>
                <Label className="labels" for="name">
                  Name:
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={handleNameDisplay()}
                  onChange={event => setName(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className="labels" for="email">
                  Email:
                </Label>
                <Input
                  type="text"
                  name="email"
                  value={handleAddressDisplay()}
                  onChange={event => setAddress(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className="labels" for="message">
                  Message:
                </Label>
                <Input
                  type="textarea"
                  name="message"
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                />
              </FormGroup>
              <button
                className="submitButton"
                type="submit"
                disabled={!message}
              >
                Send
              </button>{" "}
            </Form>
          </div>
        </Modal>
      </Row>
    </div>
  );
}

EmailBar.propTypes = {};

export default EmailBar;
