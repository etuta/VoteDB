import React from "react";

const Modal = ({ handleClose, show, children }) => {
  const handleShow = show ? "modal d-block" : "modal d-none";

  return (
    <div className={handleShow}>
      <div className="modalContainer">
        <div className="modalContent">
          {children}
          <a className="modalClose" onClick={handleClose}>
            <p></p>
            Leave
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
