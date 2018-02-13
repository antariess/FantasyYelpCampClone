var express =  require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")



//ROUTES
router.get("/", function(req, res){
    res.render("home")
})

//SIGNUP FORM
router.get("/register", function(req, res){
    res.render("register")
})

//SIGNUP CREATE
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register",{"error":err.message})
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successful sign up! Welcome to Clone Camp!")
            res.redirect("/campgrounds")
        })
    })
})

//LOGIN FORM
router.get("/login", function(req, res){
    res.render("login")
})

//LOGIN CREATE
router.post("/login", passport.authenticate("local",{
   successRedirect: "/campgrounds",
   failureRedirect: "/login"
}), function(req, res){
    
})

//LOGOUT
router.get("/logout", function(req, res){
    req.logout()
    req.flash("success", "You have signed out!")
    res.redirect("/")
})

module.exports = router