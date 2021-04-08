const Item = require('../models/item.js');


class ItemsController {
    async createItem(req, res) {

        let validateTitle = (title) => {
            var regEx = /^[a-zA-Z ]{2,30}$/;
            return regEx.test(title);
        }
        if (!req.body.price) {
            return res.status(401).json({ error: "Product price is required" });
        };
        if (!req.body.user_id) {
            return res.status(401).json({ error: "Product seller is required" });
        };
        if (!req.body.title) {
            return res.status(401).json({ error: "Product title is required" });
        };
        if (!validateTitle(req.body.title)) {
            return res.status(401).json({ error: "Not valid title !" });
        }
        const { title, price, category, user_id } = req.body
        await Item.create({
            title, price, category, user_id
        })
        res.redirect('/items/item');
    };

    async getItems(req, res) {
        await Item.findAll()
            .then(items => {
                res.render('items-listPage', { title: 'RottenApples Market', itemsList: items });
            })
            .catch(err => console.log('Error' + err))
    };
    async getOneItem(req, res) {
        console.log(req.params.id);
        await Item.findOne({ where: { id: req.params.id } }).then(item => {
            res.render('itemPage', { title: 'RottenApples Market', product: item })
        })
    };

    async getItemsByCategory(req, res) {
        // console.log(req.query.category);
        if (req.query.category === 'all') {
            await Item.findAll()
                .then(items => {
                    res.render('items-listPage', { title: 'RottenApples Market', itemsList: items })
                }).catch(err => console.log('Error' + err))
        } else {
            await Item.findAll({ where: { category: req.query.category } })
                .then(items => {
                    res.render('items-listPage', { title: 'RottenApples Market', itemsList: items })
                }).catch(err => console.log('Error' + err))
        }
    };

    async filterItems(req, res) {
        console.log(req.query.price);
        if (req.query.price === 'cheap') {
            await Item.findAll({
                order: [['price', 'ASC']]
            }).then(items => {
                res.render('items-listPage', { title: 'RottenApples Market', itemsList: items });
            }).catch(err => console.log('Error' + err))

        } else if (req.query.price === 'expensive') {
            await Item.findAll({
                order: [['price', 'DESC']]
            }).then(items => {
                res.render('items-listPage', { title: 'RottenApples Market', itemsList: items });
            }).catch(err => console.log('Error' + err))
        }
    };

    async updateItem(req, res) {
        if (!req.body.price) {
            return res.status(401).json({ error: "Product price is required" });
        };
        let prod = await Item.findOne({ where: { id: req.body.id } })
        prod.price = req.body.price;
        await prod.save();
        //    res.redirect('/items/item');
        res.render('itemPage', { title: 'RottenApples Market', product: prod })
    };

    async deleteItem(req, res) {

        let validateTitle = (title) => {
            var regEx = /^[a-zA-Z ]{2,30}$/;
            return regEx.test(title);
        }

        if (!req.query.title) {
            return res.status(401).json({ error: "Product title is required" });
        };
        if (!validateTitle(req.query.title)) {
            return res.status(401).json({ error: "Not valid title !" });
        }
        let item = await Item.findOne({ where: { title: req.query.title } })

        if (!item) {
            return res.status(401).json({ error: "Product not found !" });
        };
        await item.destroy();
        res.redirect('/items/item');
    };
};


module.exports = new ItemsController();