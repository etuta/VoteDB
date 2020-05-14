import React, { useState, useEffect } from "react";
import { MDBCol } from "mdbreact";
import { Row } from "reactstrap";
import PropTypes from "prop-types";


function SearchBar({ select }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [people, setPeople] = useState([]);

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
          setPeople(data);
        })
        .catch(err => console.log(err)); // eslint-disable-line no-console
    };
    fetchData();
  }, []);

  const handleSearchLocation = () => {
    if (searchQuery) {
      select(searchQuery);
    }
    setSearchQuery("");
  };

  const handleSearchPerson = () => {
    if (searchPerson) {
      const person = people.find(voter => voter.name === searchPerson);
      if (person) {
        const address = person.address;
        select(address);
      } else {
        alert("Please enter valid name");
      }
    }
    setSearchPerson("");
  };

  return (
    <div className="searchField">
      <Row>
        <MDBCol md="8">
          <input
            className="form-control"
            type="text"
            onClick={event => setSearchQuery(event.target.value)}
            value={searchQuery.value}
            placeholder="Look up location..."
            aria-label="Search location"
          />
        </MDBCol>
        <button
          className="button"
          disabled={!searchQuery}
          onClick={() => {
            handleSearchLocation();
          }}
          margin-right="40px"
          variant="Search location on the Map"
        >
          Search
        </button>{" "}
      </Row>
      <p></p>
      <Row>
        <MDBCol md="8">
          <input
            className="form-control"
            type="text"
            onClick={event => setSearchPerson(event.target.value)}
            value={searchPerson.value}
            placeholder="Look up person..."
            aria-label="Search person"
          />
        </MDBCol>
        <button
          className="button"
          disabled={!searchPerson}
          onClick={() => {
            handleSearchPerson();
          }}
          margin-right="40px"
          variant="Search person on the Map"
        >
          Search
        </button>{" "}
      </Row>
    </div>
  );
}

SearchBar.propTypes = {
  select: PropTypes.func.isRequired
};

export default SearchBar;
