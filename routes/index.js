const express = require("express");
const router = express.Router();
const {isAuth , isGuest} = require('../middleware/auth');
const Story = require('../models/Story');



router.get('/',isGuest,(req,res)=>{

    res.render('login' , {
        layout: 'login'
    });
});

router.get('/dashboard',isAuth,async(req,res)=>{

    try {

        // We used .lean() to convert the output to Js objects to can be passed to the view engine 
        const stories = await  Story.find({ user: req.user.id}).lean();

        res.render('dashboard' , {
            name :req.user.firstName , 
            stories : stories ,
        });

    }
    
    
    catch (error) {
        console.log(err);
        res.render('error/500')
    }



   
});













module.exports = router ;