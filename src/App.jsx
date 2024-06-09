import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import EditUserForm from "./components/EditUserForm";
import ConfirmDialog from "./components/ConfirmDialog";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const API_URL = "http://localhost:4000/users";

function App() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(true);
  const [edit, setEdit] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [reload]);

  const handleDeleteUser = (id) => {
    setDeleteUserId(id);
    setOpenConfirm(true);
  };

  const confirmDeleteUser = () => {
    fetch(`${API_URL}/${deleteUserId}`, {
      method: "DELETE",
    }).then(() => {
      setReload((p) => !p);
      setOpenConfirm(false);
    });
  };

    const columns = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "fname", headerName: "First Name", width: 250 },
      { field: "lname", headerName: "Last Name", width: 250 },
      { field: "username", headerName: "Username", width: 250 },
      { field: "password", headerName: "Password", width: 250 },
      { field: "gender", headerName: "Gender", width: 150 },
      {
        field: "action",
        headerName: "Action",
        width: 180,
        renderCell: (params) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEdit(params.row)}
              style={{ marginRight: 10 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteUser(params.row.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ];

  return (
    <div>
      <h2 className="title">CRUD</h2>
      <UserForm setReload={setReload} />
      <div style={{  width: "100%", marginTop: 20 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <EditUserForm setEdit={setEdit} setReload={setReload} edit={edit} />
      <ConfirmDialog
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleConfirm={confirmDeleteUser}
      />
    </div>
  );
}

export default App;
