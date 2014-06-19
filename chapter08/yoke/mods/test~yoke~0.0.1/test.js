var Yoke = require('yoke/Yoke');
var Router = require('yoke/middleware/Router');
var Static = require('yoke/middleware/Static');

var yoke = new Yoke();
var router = new Router();
yoke.use(router);
yoke.use(new Static('static'));

router.get('/', function (req) {    
    req.response().end('Hello World');
});

yoke.listen(8080);

