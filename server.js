var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.set('view engine', 'ejs');

var db;

MongoClient.connect('mongodb://swagner:Hippo667!@ds157078.mlab.com:57078/infostore', (err, database) => {
  if (err) return console.log(err);
  db = database;

  app.listen(3000, function() {
    console.log('Shit be istenin on 3000')
  })
})


//plug bodyparser into app to read form
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
	// res.sendFile(__dirname + "/index.html");
	// console.log("Yo what up?");

	// var cursor = db.collection('websites').find()toArray(function(err, results){
	// 	console.log(results);
	// });

	db.collection('websites').find().toArray(function (err, result) {

		if (err) return console.log(err);
		console.log(result);
		res.render('index.ejs', {sites: result});
	});

	// res.redirect('/');
});

app.post("/websites", function(req, res) {
	db.collection('websites').save(req.body, function (err, result){
		if (err) return console.log(err);
		console.log("SAVED TO DB");
		res.redirect('/');
	});
});





