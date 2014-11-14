/**
 * Created by Nightost on 2014/11/12.
 */
define(function(require,exports,module){
    function util(){
        //console.log("You just use utils");
    };

    util.prototype.log=function(str){
        if(console&&console.log){
            console.log(str);
        }
        else{
            alert(str);
        }
    }

    module.exports=util;
});