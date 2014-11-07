var express = require('express');
var router = express.Router();
router.index=function(req,res){
    res.render("index",{title:"This is Index"})
}

router.login=function(req,res){
    res.render("login",{title:"Login",message:""});
}

router.doLogin=function(req,res){
    var _logInfo={
        username:"nightost",
        psw:"123"
    };
    console.dir(req.param);
//    res.render("home",{title:"Login successd"});
    if((req.param("username")==_logInfo.username)&&(req.param("psw")==_logInfo.psw)){
        res.render("home",{title:"Login successd"});
    }
    else{
        res.render("login",{title:"Login",message:"username or password error,please check"});
    }

}

module.exports = router;
