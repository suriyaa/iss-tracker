var koa = require('koa'),
	app = koa(),
	logger = require('koa-logger'),
	route = require('koa-route'),
	staticDir = require('koa-static'),
	request = require('co-request'),
	port = process.env.PORT || 3003;

//logger
app.use(logger());
app.use(route.get('/api/:name', api))
app.use(staticDir('./'))

app.listen(port, function() {
	console.log("Koa server listening on port %s", port);
});

function *api(name) {
	switch(name) {
		case "location":
			var resp = yield request('http://api.open-notify.org/iss-now.json');
			this.body = resp.body;
			break;
		default:
			console.log("Unknown");
			this.body = "[]";
	}
}
