const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const Story = require("../models/Story");
const Comment = require("../models/comment");

router.get("/add", isAuth, (req, res) => {
  res.render("stories/add");
});

router.post("/", isAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;

    if(req.body.status === "Anonymous-Public"){
      req.body.isAnon = true ; }
      else {
        req.body.isAnon = false ;
      }

    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("error/500");
  }
});

router.get("/", isAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    

    res.render("stories/index", {
      stories,
    });
  } catch (error) {
    console.log(err);
    res.render("error/500");
  }
}); 


router.get("/Anonymous", isAuth, async (req, res) => {
  try {
    const stories = await Story.find({ isAnon: true })
      .sort({ createdAt: "desc" })
      .lean();

    

    res.render("stories/Anon_index", {
      stories,
    });
  } catch (error) {
    console.log(err);
    res.render("error/500");
  }
});



router.get("/edit/:id", isAuth, async(req, res) => {

  try {

    
    const story = await Story.findOne({
      _id : req.params.id 
  }).lean() ;
  
  if(!story){
      return res.render('error/404');
  }
  
  if (story.user != req.user.id){
      res.redirect('/stories');
  }
  else {
  res.render('stories/edit',{
      story
  })
  }

  } catch (error) {
    console.log(error);
return res.render('error/500');   
  }




});

router.put("/:id", isAuth, async(req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

if(!story){
  return res.render('error/404');
}

if (story.user != req.user.id){
  res.redirect('/stories');
}
else {

story = await Story.findOneAndUpdate({ _id : req.params.id}, req.body ,{
  new : true ,
  runValidators:true 
})

res.redirect('/dashboard');

}
  } catch (error) {
 
    console.log(error);
return res.render('error/500');
  }


});


router.delete('/:id',isAuth, async(req,res)=>{

try {


await Comment.deleteMany({story: req.params.story_id});

  await Story.remove({_id:req.params.id}); 
  res.redirect('/dashboard');
  


} 

catch (error) {
console.log(error);
return res.render('error/500');
  
}

});


router.get('/:id',isAuth,async (req,res)=>{

try {
  let story = await Story.findById(req.params.id)
  .populate('user')
  .lean(); 

  let comments = await Comment.find({ stroy: req.params.id })
  .populate('user')
  .sort({ createdAt: "asc" })
  .lean();

  if(!story){
    return res.render('error/404');
  }

  res.render('stories/show',{
    story , comments
  }) ;


} catch (error) {
  console.log(error);
  res.render('error/404');
}

})


  router.get('/user/:userId', isAuth , async(req,res)=>{

    try {

      const stories = await Story.find({
        user:req.params.userId ,
        status:'public'
      }).populate('user').lean();

      res.render('stories/index',{
        stories 
      })
      
    } catch (error) {
      console.log(error);
      res.render('error/500');
    }





  })


module.exports = router;
