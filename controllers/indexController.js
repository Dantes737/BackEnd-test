class IndexController {

     openHomePage(req, res) {
        res.render('index', { title: 'RottenApples Market' });
    };

     openAddItemPage(req, res) {
        res.render('addItemPage', { title: 'RottenApples Market' })
    };
};

module.exports = new IndexController();