const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const Comment = require("../models/comment");


router.post("/add/:id", isAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    req.body.stroy = req.params.id;

    await Comment.create(req.body);
    res.redirect("/stories/"+req.body.stroy);
  } catch (error) {
    console.log(error);
    res.render("error/500");
  }

});




router.delete('/:id',isAuth, async(req,res)=>{

  try {

     const comment = await Comment.findOne({
      _id : req.params.id 
  }).lean() ;

    

    await Comment.remove({_id:req.params.id});
    res.redirect('/stories/' + comment.stroy);
  
  
  } 
  
  catch (error) {
  console.log(error);
  return res.render('error/500');
    
  }
  
  });




 
router.get("/deleteall/:story_id", isAuth, async (req, res) => {
    try {
   


   res.redirect('/dashboard');

  } catch (error) {
      console.log(error);
      res.render("error/500");
    }
  
  });





module.exports = router;
