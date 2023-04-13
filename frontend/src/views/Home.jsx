import React from "react";

//Context
import { useContext } from "react";
import Context from "../Context";

//components
import EditUserModal from "../components/EditUserModal";
import AddUserModal from "../components/AddUserModal";

export default function Home() {
  const {
    users,
    setUsers,
    deleteUser,
    newUser,
    setNewUser,
  } = useContext(Context);

  return (
    <div className="container">
      <br />
      <h1>CRUD NodeJs + express, ReactJs, json file</h1>
      <br />
      <AddUserModal
        newUser={newUser}
        setNewUser={setNewUser}
        users={users}
        setUsers={setUsers}
      />
      <br />
      <br />
      <h2>Tabla de usuarios</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Edad</th>
              <th scope="col">borrar</th>
              <th scope="col">modal</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users.map((user, i) => (
              <tr key={i}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.last_name}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <EditUserModal
                    id={user.id}
                    userName={user.name}
                    userLastName={user.last_name}
                    userAge={user.age}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
