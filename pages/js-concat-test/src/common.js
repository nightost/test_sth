//验证手机号码
function checkMobile(select){
   var cellphone = /^1[3|4|5|8][0-9]\d{8}$/;
   if(!cellphone.test($.trim($(select).val()))){
        return false;
    }
    return true;
}
//匹配数字
function checkNum(str){
	var _reg=/\d*/;
	return _reg.test(str)?true:false;
}
function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
 	} else {
		return false;
	}
}