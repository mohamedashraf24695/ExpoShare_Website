module.exports = {

    isAuth : (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        else {
            res.redirect('/');
        }
    } , 

    isGuest : (req,res,next)=>{
        if(req.isAuthenticated()){
            res.redirect('/dashboard');
        }
        else {
            return next();

        }
    }

}