const express = require('express');
const path = require('path');
const url = require('url');
const PORT = (process.env.PORT || 5000);

function calcRate(req, res) {
    var requestUrl = url.parse(req.url, true);
	console.log("Query parameters: " + JSON.stringify(requestUrl.query));
    
    var weight = Number(requestUrl.query.weight);
	var mail = requestUrl.query.mail;
    var price = parseFloat(0.00);
    
    if (weight <= 0 || weight > 13) {
        mail = "zero";
        
    }
    
    if (mail == "stamped") {
        if (weight <= 1)
            price = 0.50;
        else if (weight <= 2)
            price = 0.71;
        else if (weight <= 3)
            price = 0.92;
        else if (weight <= 3.5)
            price = 1.13;
        else if (weight > 3.5)
            mail = "flats";
    } else if (mail == "metered") {
        if (weight <= 1)
            price = 0.47;
        else if (weight <= 2)
            price = 0.68;
        else if (weight <= 3)
            price = 0.89;
        else if (weight <= 3.5)
            price = 1.10;
        else if (weight > 3.5)
            mail = "flats";
    } 
    
    if (mail == "flats") {
        if (weight <= 1)
            price = 1.00;
        else if (weight <= 2)
            price = 1.21;
        else if (weight <= 3)
            price = 1.42;
        else if (weight <= 4)
            price = 1.63;
        else if (weight <= 5)
            price = 1.84;
        else if (weight <= 6)
            price = 2.05;
        else if (weight <= 7)
            price = 2.26;
        else if (weight <= 8)
            price = 2.47;
        else if (weight <= 9)
            price = 2.68;
        else if (weight <= 10)
            price = 2.89;
        else if (weight <= 11)
            price = 3.10;
        else if (weight <= 12)
            price = 3.31;
        else if (weight <= 13)
            price = 3.52;
    } else if (mail == "retail") {
        if (weight <= 4)
            price = 3.50;
        else if (weight <= 8)
            price = 3.75;
        else if (weight <= 9)
            price = 4.10;
        else if (weight <= 10)
            price = 4.45;
        else if (weight <= 11)
            price = 4.80;
        else if (weight <= 12)
            price = 5.15;
        else if (weight <= 13)
            price = 5.50;
    }
    
//    price.toFixed(2);
    console.log("Price: " + price);
    var params = {price: price};
    res.render('pages/calc', params);
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/calc', function (req, res) {
        calcRate(req, res);
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
