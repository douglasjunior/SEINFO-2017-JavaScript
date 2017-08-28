var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (request, response, next) {
    response.redirect("https://github.com/douglasjunior/SEINFO-2017-JavaScript");
});

module.exports = router;
