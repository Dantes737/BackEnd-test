const db = require('../db.js')

class ItemsController {
    async createItem(req, res) {
        const { title, price, category, user_id } = req.query
        console.log(title, price, category, user_id);
        // const newItem = await db
        await db.query(`INSERT INTO item(title, price, category, user_id) values ($1,$2,$3,$4) RETURNING *`, [title, price, category, user_id])
        // if (err) return res.status(500).json({ err: { msg: "Saving faild!" } })
        res.redirect('/items/item')
    };
    async getItems(req, res) {
        const items = await db.query('SELECT * FROM item')
        let itemsList=items.rows
        res.render('items-listPage', { title: 'RottenApples Market',itemsList:itemsList });
    };
    async getOneItem(req, res) {
        let id = req.params.id
        const item = await db.query('SELECT * FROM item where id=$1', [id])
        res.json(item.rows[0])
    };
    async getItemByUser(req, res) {
        let id = req.query.id
        const item = await db.query('SELECT * FROM item where user_id=$1', [id])
        res.json(item.rows)
    };
    async updateItem(req, res) {
        const { id, title, price, category } = req.body
        console.log(id, title, price, category);
        const items = await db
            .query(`UPDATE item set  title=$1, price=$2, category=$3 where id=$4 RETURNING *`, [title, price, category,id])
        res.json(items.rows[0])
    };
    async deleteItem(req, res) {
        let id = req.params.id
        const item = await db.query('DELETE FROM item where id=$1', [id])
        res.json(item.rows[0])
    };
};

module.exports = new ItemsController();