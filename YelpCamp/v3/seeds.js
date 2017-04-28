var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest",
    image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Desert Mesa",
    image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Canyon Floor",
    image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

function seedDB() {
  Campground.remove({}, function (err) {
    if (err){
      console.log(err)
    }
    console.log("removed campgrounds!");
    //add a few campgrounds
    data.forEach(function (seed) {
      Campground.create(seed, function (err, campground) {
        if(err){
          console.log(err)
        } else {
          console.log("added a campground");
          //create a comment
          Comment.create(
            {
              text: "This place is great, but i wish there was internet",
              author: "Homer"
            }, function (err, comment) {
              if (err){
                console.log(err)
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
              }

            });
        }
      });
    });
  });

}

module.exports = seedDB;

