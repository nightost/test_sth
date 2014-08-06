var _fs=require("fs");
_fs.unlink("./bedel3",function(e){
	if(e){
		console.log("error~~~~");
		throw e;
	};
	console.log("delete e://bedel successfully");
});