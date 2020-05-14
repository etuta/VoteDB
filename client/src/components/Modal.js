import React from "react";
import PropTypes from "prop-types";

const Modal = ({ handleClose, show, children }) => {
  const handleShow = show ? "modal d-block" : "modal d-none";

  return (
    <div className={handleShow}>
      <div className="modalContainer">
        <div className="modalContent">
          {children}
          <a href="#Modal" className="modalClose" onClick={handleClose}>
            <p></p>
            Leave
          </a>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.any
};

export default Modal;
