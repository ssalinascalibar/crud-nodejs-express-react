import React from "react";

const AddUserModal = ({ users, setUsers, newUser, setNewUser }) => {
  //crea y envia el nuevo usuario al servidor
  const handleSubmit = (e) => {
    e.preventDefault(); // para que no se recargue la pagina al momento de procesar el formulario
    // fetch("http://localhost:8081/api", {
    fetch("https://crud-nodejs-express-react-server.vercel.app/api" && "http://localhost:8081/api", {
      method: "POST",
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

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      id: Math.floor(Math.random() * 100).toString(7),
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Nuevo usuario
        </button>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Nuevo Usuario
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Descartar
              </button> */}
              {/* <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => editarUsuario(editUser, id)}
              >
                Guardar cambios
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
