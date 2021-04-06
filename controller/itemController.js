const Item = require('../models/item.js');


class ItemsController {
    async createItem(req, res) {

        let validateTitle = (title) => {
            var regEx = /^[a-zA-Z ]{2,30}$/;
            return regEx.test(title);
        }
        if (!req.query.price) {
            return res.status(401).json({ error: "Product price is required" });
        };
        if (!req.query.user_id) {
            return res.status(401).json({ error: "Product seller is required" });
        };
        if (!req.query.title) {
            return res.status(401).json({ error: "Product title is required" });
        };
        if (!validateTitle(req.query.title)) {
            return res.status(401).json({ error: "Not valid title !" });
        }
        const { title, price, category, user_id } = req.query
       await Item.create({
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
        Item.findOne({ where: { id: req.params.id } }).then(item => {
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
        if (!req.query.price) {
            return res.status(401).json({ error: "Product price is required" });
        };
       let prod=await Item.findOne({ where: { id: req.query.id } })
       prod.price=req.query.price;
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
        item.destroy();
        res.redirect('/items/item');
    };
};


module.exports = new ItemsController();