function logInfo(str){
	var _str=str||"";
	if(console){
		console.log(_str);
	}
	else{
		alert(_str+"哈哈哈哈");
	}
}