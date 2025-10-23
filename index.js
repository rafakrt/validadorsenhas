const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());          // opcional, útil para testar via web
app.use(express.json());  // permite ler JSON no body

// Regras via REGEX (bônus do enunciado)
const temMaiuscula = /[A-Z]/;
const temNumero = /[0-9]/;
const temEspecial = /[!@#$%^&*]/;

app.post('/validar-senha', (req, res) => {
  const { senha } = req.body;
  const erros = [];

  if (typeof senha !== 'string' || senha.length === 0) {
    return res.status(400).json({ valida: false, erros: ['A senha não foi informada'] });
  }

  // Requisitos do enunciado:
  if (senha.length < 8) erros.push('A senha precisa ter no mínimo 8 caracteres');        //  [oai_citation:3‡DEBX - Laboratório de Programação - Aula 09 2025.docx](sediment://file_000000006ef061f59bf77cdc196535e3)
  if (!temMaiuscula.test(senha)) erros.push('A senha precisa ter uma letra maiúscula');   //  [oai_citation:4‡DEBX - Laboratório de Programação - Aula 09 2025.docx](sediment://file_000000006ef061f59bf77cdc196535e3)
  if (!temNumero.test(senha)) erros.push('A senha precisa ter um número');                //  [oai_citation:5‡DEBX - Laboratório de Programação - Aula 09 2025.docx](sediment://file_000000006ef061f59bf77cdc196535e3)
  if (!temEspecial.test(senha)) erros.push('A senha precisa ter um caractere especial (!@#$%^&*)'); //  [oai_citation:6‡DEBX - Laboratório de Programação - Aula 09 2025.docx](sediment://file_000000006ef061f59bf77cdc196535e3)

  if (erros.length > 0) {
    return res.json({ valida: false, erros }); // resposta detalhada com lista de erros
  }

  return res.json({ valida: true }); // senha válida
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});