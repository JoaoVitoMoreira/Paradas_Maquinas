const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes.js');

const app = express();
app.use(express.json());

// Habilita CORS com credenciais para o frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser()); // importante se você estiver lidando com cookies

app.use('/', router);

app.listen(4000, () => {
  console.log('Servidor Ligado porta 4000');
});
