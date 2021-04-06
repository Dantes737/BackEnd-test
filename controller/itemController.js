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
        console.log(req.params.id);
            Item.findOne({ where: { id:req.params.id } }).then(item => {
                res.render('itemPage', { title: 'RottenApples Market', product: item })
            })
    };

    async getItemsByCategory(req, res) {
        // console.log(req.query.category);
        if (req.query.category === 'all') {
            Item.findAll()
                .then(items => {
                    res.render('items-listPage', { title: 'RottenApples Market', itemsList: items })
                }).catch(err => console.log('Error' + err))
        } else {
            Item.findAll({ where: { category: req.query.category } })
                .then(items => {
                    res.render('items-listPage', { title: 'RottenApples Market', itemsList: items })
                }).catch(err => console.log('Error' + err))
        }
    };

    async filterItems(req, res) {
        console.log(req.query.price);
        if (req.query.price === 'cheap') {
            Item.findAll()
                .then(items => {
                    let newItemsArr = items.sort((item1, item2) => item1.price - item2.price);
                    res.render('items-listPage', { title: 'RottenApples Market', itemsList: newItemsArr })
                }).catch(err => console.log('Error' + err))
        } else if (req.query.price === 'expensive') {
            Item.findAll()
                .then(items => {
                    let newItemsArr = items.sort((item1, item2) => item2.price - item1.price);
                    res.render('items-listPage', { title: 'RottenApples Market', itemsList: newItemsArr })
                }).catch(err => console.log('Error' + err))
        }
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