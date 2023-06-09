const express = require("express");
const cors = require('cors');
const users = require("./users.json")
const app = express();
const fs = require("fs");

app.use(cors());

app.get("/api", (req, res) => {
    // fs.readFile('./users.json', 'utf8', (err, users) => {
    //     if (err) {
    //         return;
    //     }
    //     try {
    //         const customer = JSON.stringify(users);
    // } catch(err) {
    //         console.log('Error parsing JSON string:', err);
    //     }
    // })
    console.log(users);
    return res.json(users);
    
})

//agregar usuarios
app.use(express.json())
// app.use(express.json()) sirve para parsear el content type enviado desde el front
app.post("/api", (req, res) => {
    // newUser = req.body
    console.log(req.body); // undefined
    console.log('este es el nuevo usuario')
    res.send("Api - Usuario agregado - POST");

    //Se escribe y actualiza users.json solo en el localHost:3000 y 8081 (en local)
    fs.writeFile('./users.json', JSON.stringify([...users, req.body]), (err) => {
        if (err) console.log('Error writing file:', err);
    })

    //Se escribe, actualiza y agrega un usuario en servidor en Producción, en este caso Vercel.
    users.push(req.body);
    console.log("usuarios actuales" + users)
});

//borrar usuario
app.delete("/api/:id", (req, res) => {
    const index = users.indexOf(
      users.find((value) => value.id === req.params.id.toString())
      );
      console.log("variable index = posición en array " + index)
      console.log("variable req.params = id del usuario eliminado " + req.params.id)
    users.splice(index, 1);
    
    fs.writeFile('./users.json', JSON.stringify([...users]), (err) => {
        if (err) console.log('Error writing file:', err);
    })
    res.json({message: "data deleted successfully!"});
  });

//Editar usuario
// app.put('/api/:id', (req, res) => {
//     res.send('PUT request to homepage')

    
// });

app.put("/api/:id", (req, res) => {
    // newUser = req.body
    console.log(req.body); // undefined
    console.log(req.body.id)
    console.log('este es el nuevo usuario editado')
    

    const index = users.indexOf(
        users.find((user) => user.id === req.params.id.toString())
        );
        console.log("variable index = posición en array " + index)
        console.log("variable req.params = id del usuario editado " + req.params.id)
        users.splice(index, 1);

        //funciona para actualizar users solo en producción, en desarrollo mejor comentar esta linea de código
        // users.push(req.body);
      
    fs.writeFile('./users.json', JSON.stringify([...users, req.body]), (err) => {
        users.push(req.body);
        if (err) console.log('Error writing file:', err);
    })
    res.send("api - Usuario editado - PUT");
    console.log("usuarios actuales" + users)
});

app.listen(8081, () => {
    console.log("Listening");
})