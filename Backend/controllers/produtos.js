const db=require('../cnx');

const getProdutos = (_,res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q,(err, rows) => {
        if (err) return res.json(err);
        return res.status(200).json(rows);
    });
};

module.exports = getProdutos;