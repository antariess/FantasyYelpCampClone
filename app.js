var express = require("express"),
    app = express(),
    bodyParser = require ("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")
    
    
//requiring routes
var commonRoutes = require("./routes/common")
var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")

mongoose.connect("mongodb://localhost/clone_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash())
//seedDB()

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "hot cholocate with cream",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})

app.use("/", commonRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
//====================================================

app.listen(process.env.PORT, process.env.ID, function(){
    console.log("YelpCamp clone runnung")
})