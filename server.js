var express = require ("express");
var mysql = require ("mysql");
var exphbs = require ("express-handlebars");

var app = express();
var PORT = process.env.PORT || 8081;

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    password: "farzad1365",
    database: "quotes_db",
    user: "root"
});

connection.connect(function(err){
    if(err) {
        console.log("the connection error is"+ err.stack);
    }

    console.log("the connection id is: "+connection.threadId);
});

app.listen(PORT, function(){
    console.log("The server is connected on https://localhost/"+PORT);
});