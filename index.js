const express = require('express')
const app = express()
const tarefasRoutes = require('./routes/tarefas');
const usuariosRoutes = require('./routes/usuarios');



app.use(express.json())
app.use('/tarefas',tarefasRoutes);
app.use('/usuarios',usuariosRoutes);

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})