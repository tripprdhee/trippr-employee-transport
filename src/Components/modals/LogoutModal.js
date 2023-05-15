import React from "react";
import Modal from "react-modal";
import "./style.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function LogoutModal(props) {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="contanier">
          <div className="modaltitle">
            <p>Logout</p>
          </div>
          <hr />
          <div className="modalbody">
            <p>Are you sure want to logout ?</p>
          </div>
          <hr />
          <div className="modalfooter">
            <div className="footerbutton">
              <button
                className="custum btn"
                onClick={props.onRequestClose}
              >
                cancel
              </button>
              <button
                className="custum btn"
                onClick={props.onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LogoutModal;
