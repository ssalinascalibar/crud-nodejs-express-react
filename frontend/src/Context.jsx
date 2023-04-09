// 1. se crea el contexto y se puede disponer desde cualquier lugar, como módulo
import { createContext, useState, useEffect } from "react";

const Context = createContext({});

const ContextProvider = ({ children }) => {
    
    //Estado que guarda los usuarios
    const [users, setUsers] = useState([]);

    // //estado guarda el usuario editado
    // const [editUser, setEditUser] = useState({});

    //Estado guarda al nuevo usuario
    const [newUser, setNewUser] = useState([]);

    //Usuario actual seleccionado para editar
    const [currentUser, setCurrentUser] = useState({});
    console.log(currentUser);

    //obtiene a todos los usuarios
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

      // //crea y envia el nuevo usuario al servidor
      // const handleSubmit = (e) => {
      //   e.preventDefault(); // para que no se recargue la pagina al momento de procesar el formulario
      //   fetch("http://localhost:8081/api", {
      //   // fetch("https://crud-nodejs-express-react-server.vercel.app/api", {
      //     method: "POST",
      //     body: JSON.stringify(
      //       newUser
      //       // userId: Math.random().toString(36).slice(2),
      //     ),
      //     headers: {
      //       "Content-type": "application/json; charset=UTF-8",
      //     },
      //   });
      //   setUsers([...users, newUser]);
      //   console.log(users);
      //   alert("Usuario agregado con exito");
        
      //   setNewUser("");
      //   console.log(newUser);
      //   console.log(users);
      // };

      // const handleChange = (e) => {
      //   setNewUser({
      //     ...newUser,
      //     id: Math.floor(Math.random() * 100).toString(7),
      //     [e.target.name]: e.target.value,
      //   });
      // };

      // const handleChangeName = (e) => {
      //   setEditUser({
      //     ...editUser,
      //     [e.target.name]: e.target.value,
      //   });
      // };

      // const addActualUser = (id, userName, userLastName, userAge) => {
      //   setCurrentUser({ id:id, name:userName, last_name:userLastName, age:userAge })
      //   console.log(currentUser)
      // }

      // const editarUsuario = async (editUser, id ) => {
      //   console.log(currentUser)
      //   const editedUser = ({id:id, name:editUser.name, last_name:editUser.last_name, age:editUser.age})
      //   console.log(editedUser)
      //   console.log(editUser)
      //   console.log(id)
      //   console.log(editUser)
      //   setCurrentUser(editedUser)
    
      //   fetch(`http://localhost:8081/api/${id}`, {
      //   // fetch(`https://crud-nodejs-express-react-server.vercel.app/api/${id}`, {
      //     method: "PUT",
      //     body: JSON.stringify(
      //       editedUser
      //       // userId: Math.random().toString(36).slice(2),
      //       ),
      //       headers: {
      //         "Content-type": "application/json; charset=UTF-8",
      //       },
      //     });
      //     console.log(currentUser)
      //   //se actualiza el estado del usuario seleccionado a editar con los datos traidos desde el modal
      //   // setCurrentUser({ id:id, name:userName, last_name:userLastName, age:userAge })
        
    
      //   console.log(users)
      //   // console.log("posicion usuario actual " + userFinded)
      //   // const userFinded = users.find((user) => user.id === currentUser.id)
      //   setEditUser('');
      // };

      const deleteUser = async (id) => {
        alert("Seguro que quiere eliminar a este usuario?");
        console.log(id);
        // await fetch(`http://localhost:8081/api/${id}`, {
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
      <Context.Provider
        value={{
          users,
          setUsers,
          deleteUser,
          // editarUsuario,
          // handleChangeName,
          // addActualUser,
          currentUser,
          setCurrentUser,
          newUser,
          setNewUser
        }}
      >
        {children}
      </Context.Provider>
    );
  };
  
  export { ContextProvider };
  export default Context;
  