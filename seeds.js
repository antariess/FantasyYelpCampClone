var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")

var data = [
    {
        name: "Leshy's Grove",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Leshy_%281906%29.jpg",
        description: "The cosmology of ancient Slavic religion, which is preserved in contemporary Slavic folk religion, is visualised as a three-tiered vertical structure, or 'world tree', as common in other Indo-European religions. At the top there is the heavenly plane, symblised by birds, the Sun and the Moon; the middle plane is that of earthly humanity, symbolised by bees and men; at the bottom of the structure there is the netherworld, symbolised by snakes and beavers, and by the chthonic god Veles."
    },
    {
        name: "Samodiva Pond",
        image: "https://i.pinimg.com/474x/45/7f/0d/457f0dc069f43cc4d140f5125a5f09b1--fantasy-illustration-fantasy-inspiration.jpg",
        description: "The cosmology of ancient Slavic religion, which is preserved in contemporary Slavic folk religion, is visualised as a three-tiered vertical structure, or 'world tree', as common in other Indo-European religions. At the top there is the heavenly plane, symblised by birds, the Sun and the Moon; the middle plane is that of earthly humanity, symbolised by bees and men; at the bottom of the structure there is the netherworld, symbolised by snakes and beavers, and by the chthonic god Veles."
    },
    {
        name: "Kikimora's Corner",
        image: "http://www.ancient-origins.net/sites/default/files/scary-Kikimora.jpg",
        description: "The cosmology of ancient Slavic religion, which is preserved in contemporary Slavic folk religion, is visualised as a three-tiered vertical structure, or 'world tree', as common in other Indo-European religions. At the top there is the heavenly plane, symblised by birds, the Sun and the Moon; the middle plane is that of earthly humanity, symbolised by bees and men; at the bottom of the structure there is the netherworld, symbolised by snakes and beavers, and by the chthonic god Veles."
    }
]

function seedDB(){
    //Removes campgrounds:
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("removed campgrounds!")
        //adding some campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err){
                    console.log(err)
                } else {
                    console.log("Added campground")
                    //adding some comments
                    Comment.create(
                        {
                            text: "I dont know how I made it out alive! Looking forward to next challange!",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else {
                                campground.comments.push(comment)
                                campground.save()
                                console.log("Created new comment")
                            }
                        }
                    )
                }
                
            })
        })
    })
    
    
    
}

module.exports = seedDB