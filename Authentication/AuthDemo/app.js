var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")


mongoose.connect("mongodb://localhost/auth_demo_app");


var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
  secret: "Why do you smile like you've been told a secret? Now you're telling lies cause you have sworn to keep it, but no one keeps a secret, NO ONE KEEPS A SECRET",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//==================
// ROUTES
//==================

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/secret", function (req, res) {
  res.render("secret");
});

// AUTH ROUTES

//show sign up form
app.get("/register", function (req, res) {
  res.render("register");
});
//handling user sign up
app.post("/register", function (req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function (err, user) {

    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/secret");
    });
  });
});

app.listen(9100, function () {
  console.log("app listening on port 9100")
});
