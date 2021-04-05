const Item = require('../models/item.js');


class ItemsController {
    async createItem(req, res) {
        const { title, price, category, user_id } = req.query
        Item.create({
            title, price, category, user_id
        })
        //  .then(items => {
        //     console.log(items);
        // })
        // .catch(err => console.log('Error' + err))
        res.redirect('/items/item');
    };
    async getItems(req, res) {
        Item.findAll()
            .then(items => {
                res.render('items-listPage', { title: 'RottenApples Market', itemsList: items });
            })
            .catch(err => console.log('Error' + err))
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
            .query(`UPDATE item set  title=$1, price=$2, category=$3 where id=$4 RETURNING *`, [title, price, category, id])
        res.json(items.rows[0])
    };
    async deleteItem(req, res) {
        let item = await Item.findOne({ where: { title: req.query.title } }).catch(e => {
            console.log(e.message)
        })
        if (!item) {
            console.log("err");
        }
        item.destroy();
        res.redirect('/items/item');
    };
};


module.exports = new ItemsController();