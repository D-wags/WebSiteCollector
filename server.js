var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');



var MongoClient = require('mongodb').MongoClient;

var app = express();

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

var db;

MongoClient.connect('mongodb://swagner:Hippo667!@ds157078.mlab.com:57078/infostore', (err, database) => {
  if (err) return console.log(err);
  db = database;

  app.listen(3000, function() {
    console.log('Shit be listenin on 3000')
  })
})


//plug bodyparser into app to read form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.delete("/websites/:name", function(req, res){
	console.log("???");
	console.log(req.params.name);
	var item = req.params.name;
	res.redirect('/');
	db.collection('websites').findOneAndDelete({name: item},
		function(err, result) {
			if (err) return res.send(500, err);
			console.log("DELETED");
			res.send("DELETED BRO!");
		});
});
