import React from "react";
import "../App.css"
import { Alert } from "@mui/material";
const API_URL = "http://localhost:4000/users";

function UserForm({ setReload }) {
  const handleCreateUser = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let user = Object.fromEntries(formData.entries());

    let { fname, lname, username, gender, password } = user;


    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => {
      setReload((p) => !p);
    
    });

    event.target.reset();
  };

  return (
    <form action="" onSubmit={handleCreateUser}>
      <input type="text" name="fname" placeholder="First Name" required />
      <input type="text" name="lname" placeholder="Last Name" required />
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <div className="form__radio">
        <div className="form__radio-item">
          <label htmlFor="">Male</label>
          <input type="radio" value={"male"} name="gender" />
        </div>
        <div className="form__radio-item">
          <label htmlFor="">Female</label>
          <input type="radio" value={"female"} name="gender" />
        </div>
      </div>
      <button>Create</button>
    </form>
  );
}

export default UserForm;
