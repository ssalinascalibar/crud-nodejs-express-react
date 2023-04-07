import React from "react";

const EditUserModal = ({ editUser,id, userName, userLastName, userAge, addActualUser , handleChangeName, editarUsuario}) => {
  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={"#" + id}
          onClick={() => addActualUser(id, userName, userLastName, userAge)}
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
                  value={editUser.name || ""}
                  onChange={handleChangeName}
                  placeholder={userName}
                />
                <div className="mb-3 mt-4">
                  <label className="form-label">Apellido</label>
                </div>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={editUser.last_name || ""}
                  onChange={handleChangeName}
                  placeholder={userLastName}
                />
                <div className="mb-3 mt-4">
                  <label className="form-label">Edad</label>
                </div>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  id="age"
                  name="age"
                  value={editUser.age || ""}
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
                onClick={() => editarUsuario(editUser, id)}
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
