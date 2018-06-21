const express = require('express');
const path = require('path');
const PORT = (process.env.PORT || 5000);

function calcRate(req, res) {
    var requestUrl = url.parse(req.url, true);
	console.log("Query parameters: " + JSON.stringify(requestUrl.query));
    
    res.render('pages/calc');
}

express()
    .use(express.static(path.join(__dirname, 'public')));
    .set('views', path.join(__dirname, 'views'));
    .set('view engine', 'ejs');
    .get('/', (req, res) => res.render('pages/index'));
    .get('/calc', function (req, res) {
        calcRate(req, res);
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
