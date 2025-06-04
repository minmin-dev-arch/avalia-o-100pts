const conexao = require('../db/conexao');

exports.criarTarefa = (req,res) => {
const{titulo,descricao} = req.body;

if(!titulo || typeof titulo!= 'string' || titulo.trim() == '') {
    return res.status(400).send('Este campo é obrigatório.');
}
conexao.query(
'INSERT INTO tarefas(titulo,descricao) VALUES (?,?)',
[titulo,descricao],
(err) => {
if (err) return res.status(500).send('Erro ao criar tarefa');
res.status(201).send('Tarefa criada com sucesso!');
   }
  );
};

exports.listarTarefasFiltradas= (req,res) => {
    const status = req.query.status;
    conexao.query('SELECT * FROM tarefas WHERE status = ?',[status], (err,results) => {
   if(err) return res.status(500).send('Erro ao buscar tarefas');
   res.status(200).send(results);
 });
};

exports.listarTarefas= (req,res) => {
   
    conexao.query('SELECT * FROM tarefas ', (err,results) => {
   if(err) return res.status(500).send('Erro ao buscar tarefas');
   res.status(200).send(results);
 });
};


exports.atualizarTarefa = (req,res) => {
    const {id} = req.params;
    const {titulo,descricao,status} = req.body;
   
     
    if(!titulo || typeof titulo!= 'string' || titulo.trim() == '') {
        return res.status(400).send('Este campo é obrigatório.');
    }

    if(!status === 'concluida' ) {
        Date.now = function now() {
          const data_conclusao =  new Date().toUTCString();
        };
      }
      
   
    const query = 'UPDATE tarefas SET titulo = ?,descricao = ?,status = ?  WHERE id= ?';
    conexao.query(query, [titulo,descricao,id], (err,results) => {
    if(err) return res.status(500).send('Erro ao atualizar');
    if(results.affectedRows === 0) return res.status(404).send('Tarefa não encontrada');
    res.send('Tarefa atualizada com sucesso');
     });
    };


    exports.deletarTarefa = (req,res) => {
        const{id} = req.params;
        
        conexao.query('DELETE FROM tarefas WHERE id= ?',[id], (err,results) => {
        if(err) return res.status(500).send('Erro ao deletar');
        if(results.affectedRows === 0) return res.status(404).send('Tarefa não encontrada');
        res.status(200).send('Tarefa deletada com sucesso');
         });
        };