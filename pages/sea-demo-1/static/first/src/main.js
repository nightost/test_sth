define(function(require){

    var logInfo=require("logInfo");

    var $ = require('jquery');

//    var bs=require('bootstrap');

    var bs_select=require('bootstrap-drapdown')($);


    var _tool=new logInfo();

    $(function(){
        var _btns=$(".robot input");

        console.log("hellow~~");

        _btns.each(function(){
            var _this=$(this);
            _this.bind("click",{test:1},function(e){
                _tool.log($(this).val()+ e.data.test);
            });
        });
    });
});