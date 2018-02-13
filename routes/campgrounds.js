var express =  require("express")
var router = express.Router()
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middleware = require("../middleware")

//INDEX CAMPGROUND
router.get("/", function(req, res){

    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds})
        }
    })
})


//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
})

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form
    var name = req.body.name
    var price = req.body.price
    var image = req.body.image
    var desc = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, price:price, image:image, description:desc, author:author}
    
    Campground.create(newCampground, function(err, campground){
        if (err){
            console.log(err)
        } else {
            req.flash("success", "Successfully added campground!")
            res.redirect("/campgrounds")
        }
    })
})


//SHOW ROUTE
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
        if(err || !foundcampground){
            console.log(err)
            req.flash("error", "Campground not found!")
            res.redirect("back")
        } else {
            res.render("campgrounds/show", {campground:foundcampground})
        }
    })
})

//EDIT
router.get("/:id/edit", middleware.isAuthorised, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground})
    })
})

//UPDATE
router.put("/:id", middleware.isAuthorised, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err){
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
   
})


//DELETE
router.delete("/:id", middleware.isAuthorised, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err)
            res.redirect("/")
        } else {
            req.flash("success", "Campground deleted!")
            res.redirect("/campgrounds")
        }
    })
})



module.exports = router