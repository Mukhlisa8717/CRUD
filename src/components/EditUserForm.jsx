import React, { useEffect } from "react";
const API_URL = "http://localhost:4000/users";

function EditUserForm({ setEdit, setReload, edit }) {

    useEffect(() => {
      if (edit) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
      return () => {
        document.body.classList.remove("no-scroll");
      };
    }, [edit]);

  const handleEditUser = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = () => {
    fetch(`${API_URL}/${edit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(edit),
    }).then(() => {
      setReload((p) => !p);
      setEdit(null);
    });
  };

  return (
    <>
      {edit ? (
        <div className="edit">
          <div className="edit__cont">
            <div>
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                value={edit.fname}
                onChange={handleEditUser}
              />
            </div>
            <div>
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lname"
                value={edit.lname}
                onChange={handleEditUser}
              />
            </div>
            <div>
              <label htmlFor="lname">Userame</label>
              <input
                type="text"
                name="username"
                value={edit.username}
                onChange={handleEditUser}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                value={edit.password}
                onChange={handleEditUser}
              />
            </div>
            <button onClick={handleUpdateUser}>Save</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditUserForm;
