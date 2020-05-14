import React, { useState, useEffect } from "react";
import { Row, Form, FormGroup, Input, Label } from "reactstrap";
//import data from "../seed.json";
import Modal from "./Modal.js";
import { emailStyle } from "./UIDesign.js";
import Center from "react-center";

function EmailBar() {
  const [modal, setModal] = useState(false);
  const [selectedVoters, setSelectedVoters] = useState([]);
  //Should be a list of filtered voters
  //Currently showing all voters
  const [highlight, setHighlight] = useState(false);
  const [chosenRecipients, setChosenRecipients] = useState([]);
  //Only if we want to send a mass email
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const [namesArray, setNamesArray] = useState([]);
  //For mass email feature
  const [addressArray, setAddressArray] = useState([]);
  //For mass email feature

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
  }, []);

  const getContactInfo = array => {
    const output = [];
    for (var i = 0; i < array.length; i++) {
      output.push([array[i].name, array[i].address]);
      //Currently using address in place of email
    }
    return output;
  };

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleSend = () => {
    alert(["To " + name + " at " + address + " : " + message]);
  };

  const tableRows = getContactInfo(selectedVoters);
  //Array of arrays containing name and address

  const fetchUserClick = click => {
    setName(click.target.getAttribute("voter-title").split(",")[0]);
    setAddress(click.target.getAttribute("voter-title").split(",")[1]);

    const updatedNamesArray = namesArray;
    updatedNamesArray.push(name);
    setNamesArray(updatedNamesArray);
    //For mass email feature

    const updatedAddressArray = addressArray;
    updatedAddressArray.push(address);
    setNamesArray(updatedAddressArray);
    //For mass email feature

    const updatedChosenRecipients = chosenRecipients;
    updatedChosenRecipients.push(name);
    setChosenRecipients(updatedChosenRecipients);

    if (chosenRecipients.length === 5) {
      //If we implement a mass email feature, this ensures that, at most,
      //5 voters can be chosen
      setHighlight(false);
      alert("You can only choose 5 voters at a time");
      setName("");
      setAddress("");
      setNamesArray([]);
      //For mass email feature
      setAddressArray([]);
      //For mass email feature
    }

    if (!highlight) {
      setHighlight(true);
      setChosenRecipients([]);
      //Resets
    }
  };

  const tableData = () => {
    if (!highlight) {
      return tableRows.map(voter => {
        return (
          <tr voter-item={voter} onClick={click => fetchUserClick(click)}>
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
      return tableRows.map(voter => {
        if (2 <= chosenRecipients.length <= 5) {
          if (chosenRecipients.find(recipient => recipient === voter[0])) {
            return (
              <tr voter-item={voter} onClick={click => fetchUserClick(click)}>
                <td className="cell-highlight" voter-title={voter}>
                  {voter[0]}
                </td>
                <td className="cell-highlight" voter-title={voter}>
                  {voter[1]}
                </td>
              </tr>
            );
          }
        }
        if (name === voter[0]) {
          return (
            <tr voter-item={voter} onClick={click => fetchUserClick(click)}>
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
            <tr voter-item={voter} onClick={click => fetchUserClick(click)}>
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
        <td className="headings">{"Address"}</td>
      </tr>
    );
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
            <Center>
              <tbody>
                {tableHeadings()}
                {tableData()}
              </tbody>
            </Center>
          </table>
          <div className="emailField">
            <Form>
              <FormGroup>
                <Label className="labels" for="name">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onClick={event => setName(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className="labels" for="email">
                  Email
                </Label>
                <Input
                  type="text"
                  //Should be type="email"
                  name="email"
                  value={address}
                  onClick={event => setAddress(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className="labels" for="message">
                  Message
                </Label>
                <Input
                  type="textarea"
                  name="message"
                  value={message.value}
                  onClick={event => setMessage(event.target.value)}
                />
              </FormGroup>
              <button
                className="submitButton"
                disabled={!message}
                onClick={() => {
                  handleSend();
                }}
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

export default EmailBar;
