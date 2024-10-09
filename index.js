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
        const moldes = await Moldes.create(req.body);
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
    const moldes = await Moldes.findByPk(req.params.id);
    if (moldes) {
        await moldes.update(req.body);
        res.json(moldes);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.delete('/moldes/:id', async (req, res) => {
    const moldes = await Moldes.findByPk(req.params.id);
    if (moldes) {
        await moldes.destroy();
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
