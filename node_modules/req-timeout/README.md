req-timeout
===========
set , reset and clear request timeout for connect and express

installation
-----
```bash
npm install req-timeout
```

Usage
-----
req-timeout is a middleware so you need to add it in your chain.

```javascript
var express = require('express'),
	timeout = require('req-timeout'),
	app = express();

// timeout the request at 1 seconds
app.configure('development', function() {
	app.use(timeout(1000));
});

// timeout the request at 3 seconds
app.configure('production', function() {
	app.use(timeout(3000));
});

app.use(app.router);

app.use(function(err, req, res, next) {
	if (err.timeout){
		res.send({
			'err': 'internal server error',
			'code': 500
		});
	}

});

app.get('/slow', function(req, res) {
	setTimeout(function() {
		res.send('too slow to actually matter, should timeout');
	}, 3500);
});

app.get('/fast', function(req, res) {
	res.send('should be AOK');
});

app.get('/reset', function(req, res) {
	req.resetTimeout(4000)
	setTimeout(function() {
		res.send('should be OK, time has been extended');
	}, 3500);
});

app.get('/clear', function(req, res) {
	req.clearTimeout()
	setTimeout(function() {
		res.send('should be OK, timeout has been cleared');
	}, 3500);
});

app.listen(3000);
```

overwrite express/connect timeout middleware
-------
same api, req-timeout only augment the middleware with a resetTimeout function.

```javascript
var express = require('express'),
    timeout = require('req-timeout'), 
    express.timeout = timeout,
    app = express();
    
    app.use(express.timeout(3000));
    
    ....
````

