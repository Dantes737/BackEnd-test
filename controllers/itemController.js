const Item = require('../models/item.js');
const ApiError = require('../error/ApiError.js');

class ItemsController {
    async createItem(req, res, next) {

        let validateTitle = (title) => {
            var regEx = /^[a-zA-Z ]{2,30}$/;
            return regEx.test(title);
        }
        if (!req.body.price) {
            next(ApiError.badRequest("Product price is required"));
            return;
        };
        if (!req.body.user_id) {
            next(ApiError.badRequest("Product seller is required"));
            return;
        };
        if (!req.body.title) {
            next(ApiError.badRequest("Product title is required"));
            return;
        };
        if (!validateTitle(req.body.title)) {
            next(ApiError.badRequest("Not valid title !"));
            return;
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

    async updateItem(req, res, next) {
        if (!req.body.price) {
            next(ApiError.badRequest('Product price is required'));
            return;
        };
        //     try {

        //          } catch (error) {

        //                             }
        let prod = await Item.findOne({ where: { id: req.body.id } })
        prod.price = req.body.price;
        await prod.save();
        res.render('itemPage', { title: 'RottenApples Market', product: prod })
    };

    async deleteItem(req, res, next) {

        let validateTitle = (title) => {
            var regEx = /^[a-zA-Z ]{2,30}$/;
            return regEx.test(title);
        }

        if (!req.query.title) {
            next(ApiError.badRequest("Product title is required"));
            return;
        };
        if (!validateTitle(req.query.title)) {
            next(ApiError.badRequest("Not valid title !"));
            return;
        }
        let item = await Item.findOne({ where: { title: req.query.title } })

        if (!item) {
            next(ApiError.badRequest("Product not found !"));
            return;
        };
        await item.destroy();
        res.redirect('/items/item');
    };
};


module.exports = new ItemsController();