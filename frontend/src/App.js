import React from "react";
import { useState, useEffect } from "react";

import Modal from "./components/Modal";

function App() {
  // const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [editUser, setEditUser] = useState({});
  
  //Usuario actual seleccionado para editar
  const [currentUser, setCurrentUser] = useState({});
  console.log(currentUser); 

  const getUsers = async () => {
    // const endPoint = "http://localhost:8081/api";
    const endPoint = "https://crud-nodejs-express-react-server.vercel.app/api";
    const response = await fetch(endPoint);
    const data = await response.json();

    setUsers(data);
    console.log(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:8081/api')
  //   .then(res => res.json())
  //   .then(data => setData(data.message))
  //   .catch(err => console.log(err));
  // });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      id: Math.floor(Math.random() * 100).toString(7),
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeName = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const addActualUser = (id, userName, userLastName, userAge) => {
    setCurrentUser({ id:id, name:userName, last_name:userLastName, age:userAge })
    console.log(currentUser)
  }

  const editarUsuario = async (editUser, id ) => {
    console.log(currentUser)
    const editedUser = ({id:id, name:editUser.name, last_name:editUser.last_name, age:editUser.age})
    console.log(editedUser)
    console.log(editUser)
    console.log(id)
    console.log(editUser)
    setCurrentUser(editedUser)

    fetch(`http://localhost:8081/api/${id}`, {
      method: "PUT",
      body: JSON.stringify(
        editedUser
        // userId: Math.random().toString(36).slice(2),
        ),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(currentUser)
    //se actualiza el estado del usuario seleccionado a editar con los datos traidos desde el modal
    // setCurrentUser({ id:id, name:userName, last_name:userLastName, age:userAge })
    

    console.log(users)
    // console.log("posicion usuario actual " + userFinded)
    // const userFinded = users.find((user) => user.id === currentUser.id)
    setEditUser('');
  };
  

  const handleSubmit = (e) => {
    e.preventDefault(); // para que no se recargue la pagina al momento de procesar el formulario
    // fetch("http://localhost:8081/api", {
    fetch("https://crud-nodejs-express-react-server.vercel.app/api", {
      method: "GET",
      body: JSON.stringify(
        newUser
        // userId: Math.random().toString(36).slice(2),
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setUsers([...users, newUser]);
    console.log(users);
    alert("Usuario agregado con exito");
    setNewUser("");
    console.log(newUser);
    console.log(users);
  };

  const deleteUser = async (id) => {
    alert("Seguro que quiere eliminar a este usuario?");
    console.log(id);
    await fetch(`https://crud-nodejs-express-react-server.vercel.app/api/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        setUsers(
          users.filter((user) => {
            return user.id !== id;
          })
        );
      } else {
        return;
      }
    });
  };

  return (
    <div>
      <div className="container">
        <br />
        <h1>CRUD NodeJs + express, ReactJs, json file</h1>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Edad</th>
            </tr>
          </thead>
          <tbody>
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
                    Delete
                  </button>
                </td>
                <td>
                  <Modal
                    editUser={editUser}
                    id={user.id}
                    userName={user.name}
                    userLastName={user.last_name}
                    userAge={user.age}
                    editarUsuario={editarUsuario}
                    handleChangeName={handleChangeName}
                    addActualUser={addActualUser}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              className="form-control form-control-lg"
              type="text"
              id="name"
              name="name"
              value={newUser.name || ""}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              className="form-control form-control-lg"
              type="text"
              id="last_name"
              name="last_name"
              value={newUser.last_name || ""}
              onChange={handleChange}
              placeholder="Apellido"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Edad</label>
            <input
              className="form-control form-control-lg"
              type="text"
              id="age"
              name="age"
              value={newUser.age || ""}
              onChange={handleChange}
              placeholder="Edad"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Agregar usuario
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
