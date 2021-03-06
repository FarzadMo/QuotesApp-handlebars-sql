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
    password: "",
    database: "quotes_db",
    user: "root"
});

connection.connect(function(err){
    if(err) {
        console.log("the connection error is"+ err.stack);
    }

    console.log("the connection id is: "+connection.threadId);
});

//ROUTES
//Main page:
app.get("/", function(req, res){
    connection.query("SELECT * FROM quotes;", function(err, result){
        if(err){
            return res.status(500).end();
        }

        res.render("index", {quotes: result});
    });
});
//DELETE QUOTES
app.delete("/api/quotes/:id", function(req, res){
    connection.query("DELETE FROM quotes WHERE id= ?",[req.params.id], function(err, result){
        if(err){
           return res.status(500).end();
        } else if(result.affectedRows === 0){
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

//CREATE QUOTES
app.post("/api/quotes", function(req, res){
    connection.query("INSERT INTO quotes (author, quote) VALUES (?, ?)", [(req.body.author), (req.body.quote)], function(err, result){
        if (err) {
            return res.status(500).end();
        }
        res.status(200).end();
    });
});

//GET ONE QUOTE FOR UPDATE PAGE
app.get("/:id", function(req, res){
    connection.query("SELECT * FROM quotes WHERE id = ?", [req.params.id], function(err, data){
        if (err) {
            return res.status(500).end();
        }
        //console.log(" id data[0] of Single Get" +data[0].id);
        //console.log(" quote data[0] of Single Get" +data[0].quote);
        //console.log(" author data[0] of Single Get " +data[0].author);
        res.render("single-quote", data[0]);
    });
});

//UPDATE THE QUOTE
app.put("/api/quotes/:id", function(req, res){
    connection.query("UPDATE quotes SET quote = ?, author = ? WHERE id = ?",[(req.body.quote),(req.body.author),(req.params.id)], function(err, result){
        if(err) {
            return res.status(500).end();
        }
        else if (result.changedRows===0){
            return res.status(404).end();
        }
        res.status(200).end();
    });
});



app.listen(PORT, function(){
    console.log("The server is connected on https://localhost/"+PORT);
});