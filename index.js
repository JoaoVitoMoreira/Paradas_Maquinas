const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/cnx.js');
const Moldes = require('./models/moldes.js');

const app = express();
app.use(bodyParser.json());

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado.');
}).catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});

app.post('/moldes', async (req, res) => {
    try {
        const { nome_mold, form_mold} = req.query;
        if (!nome_mold || !form_mold) {
            return res.status(400).json({ error: 'Parâmetros nome e forma são necessários' });
        }
        const moldes = await Moldes.create({nome_mold, form_mold});
        res.status(201).json(moldes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/moldes', async (req, res) => {
    const moldes = await Moldes.findAll();
    res.json(moldes);
});

app.get('/moldes/:id', async (req, res) => {
    const moldes = await Moldes.findByPk(req.params.id);
    if (moldes) {
        res.json(moldes);
    } else {
        res.status(404).json({ error: 'Molde não encontrado' });
    }
});

app.put('/moldes/:id', async (req, res) => {
    const { nome_mold, form_mold } = req.query;
    const moldes = await Moldes.findByPk(req.params.id);

    if (moldes) {
        await moldes.update({ 
            nome_mold: nome_mold !== undefined ? nome_mold : moldes.nome_mold,
            form_mold: form_mold !== undefined ? form_mold : moldes.form_mold
        });
        res.json(moldes);
    } else {
        res.status(404).json({ error: 'Molde não encontrado' });
    }
});


app.delete('/moldes/:id', async (req, res) => {
    const moldes = await Moldes.findByPk(req.params.id);
    if (moldes) {
        await moldes.destroy();
        res.status(200).json({ message: 'Molde deletado com sucesso!' });
    } else {
        res.status(404).json({ error: 'Molde não encontrado' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
