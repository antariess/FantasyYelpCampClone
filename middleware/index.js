var express =  require("express")
var router = express.Router()
var Campground = require("../models/campground")
var Comment = require("../models/comment")

var middlewareObj = {}

//campgrounds
middlewareObj.isAuthorised = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Error with campground, please alert system admin!")
                console.log(err)
                res.redirect("back")
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next()
                } else {
                    req.flash("error", "You are not who you claim to be!")
                    res.redirect("back")
                }
                
            }
        })  
    } else {
        req.flash("error", "Please sign in to continue!")
        res.redirect("back")
    }
}


//  Comment authorisation check
middlewareObj.isAuthorisedComment = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err)
                res.redirect("back")
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next()
                } else {
                    req.flash("error", "You are not who you claim to be!")
                    res.redirect("back")
                }
                
            }
        })  
    } else {
        req.flash("error", "Please sign in to continue!")
        res.redirect("back")
    }
}

//authentication check
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please sign in to continue!")
    res.redirect("/login");
}

module.exports = middlewareObj

