var express= require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect("mongodb://raj:raj123@ds153778.mlab.com:53778/glitchquiz", { useNewUrlParser: true });

const port=process.env.PORT || 3000

//Schema Setup.
var glitchSchema = new mongoose.Schema({
	name: String, 
	member1: String, 
	member2: String
});

var register = mongoose.model("register", glitchSchema);




//adding css files to the node server.
app.use(express.static('public'));



app.set("view engine", "ejs");




// ROUTING PART STARTS HERE
app.get("/", function(req, res){
	res.render("index");
});

app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register",urlencodedParser, function(req, res){
	//get data from form and add to glitch array.
	var name = req.body.name;
	var membr1 = req.body.mname;
	var membr2 = req.body.m2name;
	var data = {name: name, member1: membr1, member2: membr2};
	//Create a new entry and save it to DB
	register.create(data, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			// redirect to campground page
			res.redirect("/"); 
		}
	});		 
});


app.get("/quiz", function(req, res){
	res.render("questions");
});



app.get("/:randomText", function(req, res){
	res.render("other");
});




//LISTNING PORT INFORMATION
 app.listen(port, "0.0.0.0", function(){
	console.log("Server is live at port 3000");
 });
