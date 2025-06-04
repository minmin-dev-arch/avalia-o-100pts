const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'lista_tarefas'
});

module.exports = conexao;