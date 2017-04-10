var express = require('express');
var router = express.Router();


router.get('/', function (request, response) {

    response.sendfile('views/index.html')
});
//TODO: Adjust re-reouting...
router.get('/online_groups', function (request, response) {

    response.sendfile('views/online_groups.html')
});

module.exports = router;