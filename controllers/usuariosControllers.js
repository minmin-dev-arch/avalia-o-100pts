const conexao = require('../db/conexao');
const bcrypt = require ('bcryptjs');

exports.criarUsuario = async (req,res) => {
    const {nome,email,senha} = req.body;
     
    if(!nome || !email || !senha) {
 return res.status(400).json({erro: 'Nome,email e senha são obrigatórios.' });
}

try {
const senhaCriptografada = await bcrypt.hash(senha, 10);

const sql = 'INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?)';
conexao.query(sql,[nome,email,senhaCriptografada], (err,results) => {
 if (err) {
   if(err.code === 'ER_DUP_ENTRY') {
return res.status(409).json({erro: 'E-mail já cadastrado.'});
 }
return res.status(500).json({erro: 'Erro ao cadastrar usuário.'});
}

 
res.status(201).json({mensagem : 'Usuário criado com sucesso!'});
});

}  catch (erro) {
    res.status(500).json({erro: 'Erro ao processar requisição.'});
 }
};



exports.login = (req, res) => {
    const { email, senha } = req.body;
  
    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
    }
  
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    conexao.query(sql, [email], async (err, resultados) => {
      if (err) return res.status(500).json({ erro: 'Erro ao buscar usuário.' });
  
      if (resultados.length === 0) {
        return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
      }
  
      const usuario = resultados[0];
  
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
  
      if (!senhaValida) {
        return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
      }
  
      res.json({ mensagem: 'Login realizado com sucesso!' });
    });
  };
  