var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function (req, res) {
    res.render("home");
});

app.post("/addfriend", function (req, res) {
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
   res.redirect("/friends");
});

app.get("/friends", function (req, res) {
   res.render("friends", {friends: friends});
});

app.listen(7000, function () {
   console.log("app listening on port 7000");
});