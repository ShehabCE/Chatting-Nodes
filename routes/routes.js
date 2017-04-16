var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (request, response) {
    response.sendFile(path.resolve('views/index.html'));
});

router.get('/online_groups', function (request, response) {
    response.sendFile(path.resolve('views/private.html'));
});

router.get('/public', function (request, response) {
    response.sendFile(path.resolve('views/public.html'));
});


module.exports = router;