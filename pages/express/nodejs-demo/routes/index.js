var express = require('express');
var router = express.Router();
router.index=function(req,res){
    res.render("index",{title:"This is Index"})
}

router.login=function(req,res){
    res.render("login",{title:"Login",message:""});
}

exports.home = function(req, res){
    console.log(req.session.user);
    res.render('home', { title: 'Home'});
};

router.doLogin=function(req,res){
    var _logInfo={
        username:"nightost",
        psw:"123"
    };
//    res.render("home",{title:"Login successd"});
    console.log(req.param("username"));
    if((req.param("username")==_logInfo.username)&&(req.param("psw")==_logInfo.psw)){
        req.session.user=_logInfo.username;
//        res.render("home",{title:"Login successd"});
        res.redirect('/home');
    }
    else{
        res.render("login",{title:"Login",message:"username or password error,please check"});
    }
}
module.exports = router;
