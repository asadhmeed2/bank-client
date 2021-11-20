import React from "react";
import TransactionContainer from "../transactions/transactionContainer.component";
import "./style/user.style.css";
import axios from "axios";
function User({ id, passportId, cash, credit }) {
  const [user] = React.useState({
    id,
    passportId,
    cash,
    credit,
  });

  const messageRef = React.useRef();
  const UserTransferHandler = (amount, toAccountPassportID) => {
    const requestData = {
      amount: amount,
      receiverPassportId: toAccountPassportID,
      id: user.id,
    };
    if(Number.isNaN(Number(amount))) {//check if the amount is a number
      messageRef.current.textContent = "Error amount must be a number: ";
      return;
    }
    axios
      .put("https://bank-server-demo.herokuapp.com/transfer", requestData)
      .then((response) => {
        const tempUser = { ...user };
        tempUser.cash -= amount;
      })
      .catch((error) => {
        console.log(error.message);
        messageRef.current.textContent = "Error transfer failed: ";
      });
  };
  const userUpdateHandler = (amount, transactionType) => {
    const requestData = {
      amount: amount,
      id: user.id,
    };
    if(Number.isNaN(Number(amount))) {//check if the amount is a number
      messageRef.current.textContent = "Error amount must be a number: ";
      return;
    }
    axios
      .put(`https://bank-server-demo.herokuapp.com/${transactionType}`, requestData)
      .then((response) => {
        const tempUser = { ...user };
        if (transactionType === "deposit") {
          tempUser.cash += amount;
        } else if (transactionType === "withdrow") {
          tempUser.cash -= amount;
        } else if (transactionType === "changeCredit") {
          tempUser.credit = amount;
        }
      })
      .catch((error) => {
        console.log(error.message);
        messageRef.current.textContent = `Error ${transactionType} failed:`;
      });
  };
  const hideMessage = () => {
    messageRef.current.textContent = "";
  };
  return (
    <div className="userWarpper">
      <div className="user">
        <div className="id">Id : {id}</div>
        <div className="passportId"> PassportId : {passportId}</div>
        <div className="cash">Cash : {cash}</div>
        <div className="credit">Credit : {credit}</div>
      </div>
    
        <TransactionContainer
          hideMessage={hideMessage}
          UserTransferHandler={UserTransferHandler}
          userUpdateHandler={userUpdateHandler}
        />
   
      <div ref={messageRef} className="message"></div>
    </div>
  );
}

export default User;
