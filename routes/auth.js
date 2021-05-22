const express = require("express");

const passport = require("passport");
const router = express.Router();

// authentication route (google)

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ['profile'],
  })
);

// authentication callback (google)

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);


// Logout route 

router.get('/logout',(req,res)=>{

  // the logout function is caused by passport middleware as passport make it 
  // on the Request object 

req.logOut();
res.redirect('/');

});

module.exports = router;

