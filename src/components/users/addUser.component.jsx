import React from "react";
import axios from "axios";
import './style/addUser.style.css'
function AddUser() {
    const [user,setUser]=React.useState({passportId:"",cash:"",credit:""});
    const messageRef =React.useRef();
  const inputHandler=(e)=>{
    const tempUser ={...user};
    if((e.target.name === "cash" || e.target.name === "credit")&& !Number.isNaN( Number(e.target.value))){
      messageRef.current.textContent = "";
      tempUser[e.target.name]=e.target.value
      console.log(tempUser);
      setUser(tempUser);
    }else if(e.target.name === "passportId"){
      tempUser[e.target.name]=e.target.value;
      setUser(tempUser);
    }else{
      messageRef.current.textContent = "Error cash or credit must be a number: ";
    }
  }
  const onFormSubmit=()=>{
    if(Number.isNaN(Number(user.cash))&&Number.isNaN(Number(user.credit))){//check if the amount is a number
      messageRef.current.textContent = "Error cash or credit are not a number: ";
      return;
    }
    console.log(user);
    messageRef.current.textContent = "";
    axios.post("http://localhost:5000/users",user).then(response=>{
        messageRef.current.textContent = 'user wase added successfuly'
    }).catch(error=>{
      console.log(error);
    });
  }
  return (
    <div className="addUser">
      <div className="addUserWarpper">
      <input type="text" name="passportId" className="passportId" placeholder="Passport ID" onChange={inputHandler}/>
      <input type="text" name="cash" className="cash" value={user.cash} placeholder="Cash"onChange={inputHandler}/>
      <input type="text" name="credit" className="credit" value={user.credit} placeholder="Credit"onChange={inputHandler}/>
      <input type="button" value="Add User" onClick={onFormSubmit}/>
      </div>
      <div className="message" ref={messageRef}></div>
      <div className="addUserLogo">
        <h1><span className="Add-h1">Add</span> <span className="New-h1">New</span> <span className='user-h1'>User</span> </h1>
      </div>
    </div>
  );
}

export default AddUser;
