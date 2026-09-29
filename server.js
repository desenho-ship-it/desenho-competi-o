const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('.')); // serve o index.html

// Rota que salva no "excel"
app.post('/entrar', (req, res) => {
  const { instagram, senha_app, data } = req.body;
  
  // Salva num arquivo CSV que abre no Excel
  const linha = `${instagram},${senha_app},${data}\n`;
  
  if (!fs.existsSync('usuarios.csv')) {
    fs.writeFileSync('usuarios.csv', 'instagram,senha_app,data\n');
  }
  
  fs.appendFileSync('usuarios.csv', linha);
  console.log('Novo cadastro:', instagram);
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log('Drawly rodando em http://localhost:3000');
});