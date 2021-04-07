class IndexController {

    async openHomePage(req, res) {
        res.render('index', { title: 'RottenApples Market' });
    };

    async openAddItemPage(req, res) {
        res.render('addItemPage', { title: 'RottenApples Market' })
    };
};

module.exports = new IndexController();