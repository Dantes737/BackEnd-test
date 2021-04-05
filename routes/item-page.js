var express = require('express');
var router = express.Router();

const cinemaList = [
  {
    name: "Domion",
    siteLink: "http://domion.info/"
  },
  {
    name: "5Element",
    siteLink: "http://5element.uz.ua/index.php"
  },
  {
    name: "Netflix",
    siteLink: "https://www.netflix.com/ua-ru/"
  },
  {
    name: "Ivi",
    siteLink: "https://www.ivi.ru/movies"
  },
  {
    name: "Megogo",
    siteLink: "https://megogo.net/ua/films"
  }
]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('itemPage', { title: 'RottenApples Market',cinemaList:cinemaList });
});

module.exports = router;

