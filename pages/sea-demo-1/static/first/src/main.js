define(function(require){

    var util=require("../../util/util.js");

    var $ = require('jquery');

//    var bs=require('bootstrap');

    var bs_select=require('bootstrap-drapdown')($);

    var css = require("main.css");

    var _tool=new util();

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