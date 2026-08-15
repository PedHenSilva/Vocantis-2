const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Acesso aos outros html para alcance do Express
app.use(express.static(path.join(__dirname, '../../')));

/*
// Conexão ao banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2307', 
    database: 'vocantis_db'
});
*/

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true
    }
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão concluída!');
});

// Rotas de páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(caminhoRaiz, 'index.html'));
});

app.get('/perguntas', (req, res) => {
    res.sendFile(path.join(caminhoRaiz, 'perguntas.html'));
});

// Rota Cadastro
app.post('/cadastro', async (req, res) => {

    const { nome, email, telefone, idade, cidade, escolaridade, senha } = req.body;

    // Inserindo em colunas separadas
    const sql = `INSERT INTO usuarios (nome, email, telefone, idade, cidade, escolaridade, senha) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    const valores = [nome, email, telefone, idade, cidade, escolaridade, senha];

    db.query(sql, valores, (err, result) => {
        if (err) return res.status(500).send("Erro no banco: " + err.message);
        res.status(201).json({ 
            nome: nome, 
            email: email 
        });;
    });
});

// Rota Login
app.post('/login', (req, res) => {

    const { email, senha } = req.body;
    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).send('Erro no servidor.');
        
        // Verifica a lista de resultados
        if (results.length > 0) {
            const usuario = results[0]; // Extrai o usuário encontrado

            // Verficação de senha
            if (senha === usuario.senha) {
                res.status(200).json({ 
                    nome: usuario.nome, 
                    email: usuario.email 
                });;
            } else {
                res.status(401).send('Senha incorreta.');
            }
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    });
});

// Rota para buscar todos os cursos (ETEC e FATEC)
app.get('/api/cursos', (req, res) => {
    const sql = `
        SELECT 
            \`Instituição\`, 
            \`Curso\`, 
            \`Tipo\`, 
            \`Eixo Tecnológico\`, 
            \`Duração/Semestre\`, 
            \`Descrição\`
        FROM cursos_etec
        WHERE \`Tipo\` = 'Cursos Técnicos - Modalidade Presencial'
        UNION
        SELECT 
            \`Instituição\`, 
            \`Curso\`, 
            \`Tipo\`, 
            \`Eixo Tecnológico\`,
            \`Duração/Semestre\`, 
            \`Descrição\`
        FROM cursos_fatec
        WHERE \`Tipo\` = 'Curso Superior de Tecnologia Presencial'
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cursos no MySQL:', err);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
        res.json(results); // Envia resultados
    });
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
