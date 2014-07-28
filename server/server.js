var _http=require("http");
var _url=require("url");
var _path=require("path");
var _fs=require("fs");
var _mime=require("../common/mine.js").mime;
var _server=_http.createServer(requestListener);
_server.listen(8082);
console.log("Server started at 8082");
/**
 * [requestListener description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
function requestListener(request,response){
    var _pathname=_url.parse(request.url).pathname;
    var _realPath="../pages"+_pathname;
    console.log("request is commming~ "+_pathname);
    _fs.exists(_realPath, function(isExited){
        if(!isExited){
            response.writeHead("404",{
                "content-type":"text/plain"
            });
            response.write("sorry,I can't find the file~");
            response.end();
        }
        else{
            var _contentType=getContentType(_pathname);
            _fs.readFile(_realPath, "binary",function(err,data){
                if(err){
                    response.writeHead("500",{
                        "content-type":"text/plain"
                    });
                    response.write("Sorry,coder are finding errors~");
                    response.end();
                }
                else{
                    response.writeHead("200",{
                        "content-type":_contentType
                    });
                    response.write(data,"binary");
                    response.end();
                }
            });
        }
    });
   
}
/**
 * [getContentType description]
 * @return {[type]} [description]
 */
function getContentType(path){
    var _extTemp=_path.extname(path);
    var _ext=_extTemp?_extTemp.slice(1):"unknown";
    var _contentType=_mime[_ext]||"text/plain";
    return _contentType;
}