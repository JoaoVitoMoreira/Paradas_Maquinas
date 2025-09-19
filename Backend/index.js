require('dotenv').config();

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes.js'); 

const app = express();

app.use(cors({
   origin: [
    'http://localhost:3000',     
    'http://135.224.15.6:3000'   
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.listen(4000, '0.0.0.0', () => {
  console.log('Servidor Ligado na porta 4000');
});