var express= require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/glitch', {useNewUrlParser: true});
var Schema = mongoose.Schema;


//Schema Setup.
var glitchSchema = new Schema({
	name: String, 
	member1: String, 
	member2: String
});

var glitch = mongoose.model("glitch", glitchSchema);




//adding css files to the node server.
app.use("/cssFiles", express.static(__dirname + '/asset'));



app.set("view engine", "ejs");




// ROUTING PART STARTS HERE
app.get("/", function(req, res){
	res.render("index");
});

app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	//get data from form and add to glitch array.
	var name = req.body.name;
	var membr1 = req.body.mname;
	var membr2 = req.body.m2name;
	var data = {name: name, member1: membr1, member2: membr2};
	//Create a new entry and save it to DB
	glitch.create(data, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			// redirect to campground page
			console.log(newlyCreated)
			res.redirect("/"); 
		}
	});		 
});


app.get("/grapesJS", function(req, res){
	res.render("grapes");
});



app.get("/:randomText", function(req, res){
	res.render("other");
});




//LISTNING PORT INFORMATION
app.listen(3000, function(){
	console.log("Server is live at port 3000");
});