import React from "react";

//Context
import { useContext } from "react";
import Context from "../Context";

import { useState } from "react";

const EditUserModal = ({ id, userName, userLastName, userAge }) => {

  //variables globales, context
  const { users, currentUser, setCurrentUser } = useContext(Context);

  //estado guarda el usuario editado
  // const [editUser, setEditUser] = useState({});

  const addActualUser = () => {
    setCurrentUser({ id:id, name:userName, last_name:userLastName, age:userAge })
  }
  console.log(currentUser)

  const handleChangeName = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const editarUsuario = async () => {
    console.log(currentUser)
    const editedUser = ({id:id, name:currentUser.name, last_name:currentUser.last_name, age:currentUser.age})
    console.log(editedUser)
    // console.log(editUser)
    console.log(id)
    // console.log(editUser)
    
    // await fetch(`http://localhost:8081/api/${id}`, {
    await fetch(`https://crud-nodejs-express-react-server.vercel.app/api/${id}`, {
        method: "PUT",
        body: JSON.stringify(
          editedUser
          // userId: Math.random().toString(36).slice(2),
          ),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      setCurrentUser(editedUser)
      console.log(currentUser)
    //se actualiza el estado del usuario seleccionado a editar con los datos traidos desde el modal
    // setCurrentUser({ id:id, name:userName, last_name:userLastName, age:userAge })
    

    console.log(users)
    // console.log("posicion usuario actual " + userFinded)
    // const userFinded = users.find((user) => user.id === currentUser.id)
    setCurrentUser('');
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={"#" + id}
          onClick={() => addActualUser()}
        >
          Editar
        </button>
      </div>

      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Editar usuario</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 mt-4">
                  <label className="form-label">Id</label>
                </div>
                <input
                  className="form-control form-control-lg"
                  readOnly type="text"
                  id="id"
                  name="id"
                  value={id || ""}
                  placeholder="Id"
                />

                <div className="mb-3 mt-4">
                  <label className="form-label">Nombre</label>
                </div>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  id="name"
                  name="name"
                  value={currentUser.name || ""}
                  onChange={handleChangeName}
                  placeholder={currentUser.name}
                />
                <div className="mb-3 mt-4">
                  <label className="form-label">Apellido</label>
                </div>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={currentUser.last_name || ""}
                  onChange={handleChangeName}
                  placeholder={userLastName}
                />
                <div className="mb-3 mt-4">
                  <label className="form-label">Edad</label>
                </div>
                <input
                  className="form-control form-control-lg"
                  type="number"
                  id="age"
                  name="age"
                  value={currentUser.age || ""}
                  onChange={handleChangeName}
                  placeholder={userAge}
                />
                {/* <button
                  type="button"
                  onClick={editarUsuario}
                  className="btn btn-primary"
                >
                  Editar
                </button> */}
              </form>
            </div>
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Descartar
              </button> */}
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => editarUsuario() }
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
