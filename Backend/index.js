import cors from 'cors';
import express from 'express';
import path from 'path';
import router from './routes/routes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use(cors())

app.use('/',router);

app.use(express.static(path.join(__dirname,'src')));

app.listen(4000, ()=>{
    console.log('Servidor Ligado')
});