const db=require('../cnx');

const getProdutos = (_,res) => {
    const q = "SELECT * FROM produtos";

    db.query(q,(err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

module.exports = getProdutos;