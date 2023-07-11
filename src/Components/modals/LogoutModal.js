import React from "react";
import Modal from "react-modal";
import "./style.css";
import LogoutGirl from "../../Assets/png/logout-girl1.png";

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
          <img src={LogoutGirl} alt="" />
          <div className="modalbody">
            <p>Are you sure you want to logout ?</p>
          </div>
          <div className="modalfooter">
            <div className="footerbutton">
              <button
                className="custum btn"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #444",
                }}
                onClick={props.onRequestClose}
              >
                NO
              </button>
              <button className="custum btn" onClick={props.onLogout}>
                YES
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LogoutModal;
