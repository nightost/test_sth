module.exports=function(grunt){
	grunt.initConfig({
        //read package.json
        pkg: grunt.file.readJSON('package.json'),
        path:{
            baseDir:"static",
            appSrc:"",
            appDest:"",
            appName:"",
            copypath:""
        },
        //sass css
        sass:{
            main:{
                files:[{
                    "expand": true,
                    "cwd": "<%=path.baseDir%>/<%=path.appSrc%>",
                    //dest最终生成的目录与下面src参数中的设置的路径相关
                    "src": ["*.scss"],
                    "dest": "<%=path.baseDir%>/<%=path.appDest%>",//生成dist目录
//                    "dest": "static/first/dist",//生成dist目录
                    "ext":"-debug.css"
                }]
            }
        },
        //css min
        cssmin:{
            main:{
                files:[{
                    "expand": true,
                    "cwd":  "<%=path.baseDir%>/<%=path.appDest%>",
                    "src": ["*-debug.css"],
                    "dest": "<%=path.baseDir%>/<%=path.appDest%>",//生成至源目录
                    "rename":function(dest,src){
                        var _filename=src.replace("-debug","");
                        return dest+"/"+_filename;
                    }
                }]
            }
        },
        //image min
        imagemin:{
            main:{
                files:[{
                    "expand":true,
                    "cwd":"/static",
                    "src":["**/src/*.jpg","**/src/*.png","**/src/*.gif"],
                    "dest":"**/dist/"
                }]
            }
        },
        //transport cmd js file
        transport : {
            options : {
                //跟下面的app无关,针对alias
                paths : ['spm_modules/'],
                //可为js里面的依赖提供路径
                alias: {
                    "jquery" : "<%=pkg.spm.alias.jquery%>",
                    "jquery-debug":"<%=pkg.spm.alias.jqueryDebug%>",
                    "logInfo":"util/logInfo",
                    "bootstrap-drapdown":"bootstrap/assets/javascripts/bootstrap/dropdown"
                },
                debug:true
            },
            app : {
                options : {
                    //前置目录
                    idleading : '<%=path.baseDir%>/<%=path.appName%>/'
                },
                files : [{
                    "expand": true,
                    "cwd" : '<%=path.baseDir%>/<%=path.appSrc%>',
                    "src" : ['*.js'],
                    filter : 'isFile',
                    "dest" : 'spm_modules/.build/<%=path.appDest%>'
                }]
            },
            util:{
                options : {
                    //跟下面的app无关,针对alias
                    paths : ['spm_modules/'],
                    //可为js里面的依赖提供路径
                    alias: {
                        "jquery" : "<%=pkg.spm.alias.jquery%>",
                        "jquery-debug":"<%=pkg.spm.alias.jqueryDebug%>",
                        "logInfo":"util/logInfo",
                        "bootstrap-drapdown":"bootstrap/assets/javascripts/bootstrap/dropdown"
                    },
                    debug:true,
                    //前置目录
                    idleading : ''
                },
                files : [{
                    "expand": true,
                    "cwd" : 'spm_modules',
                    "src" : ['**/jquery.js','**/jquery.js','bootstrap/*.js','util/*.js'],
                    filter : 'isFile',
                    "dest" : 'spm_modules/.build'
                }]
            }
        },
        concat:{
            app:{
                options:{
                    include:"all",
                    paths:["spm_modules/.build"],
                    alias: {
                        "jquery" : "<%=pkg.spm.alias.jquery%>",
                        "jquery-debug":"<%=pkg.spm.alias.jqueryDebug%>",
                        "logInfo":"util/logInfo",
                        "bootstrap-drapdown":"bootstrap/assets/javascripts/bootstrap/dropdown"
                    }
                },
                files:[{
                    expand: true,
                    cwd : 'spm_modules/.build',
                    //Importan concat 查找路径
                    src : ['<%=path.appDest%>/*.js'],//'**/jquery.js'
                    filter : 'isFile',
                    dest : '<%=path.baseDir%>'
                }]
            }
        },
        uglify:{
            main:{
                /*files:[{
                    "expand": true,
                    "cwd":" <%=path.baseDir%>/<%=path.appDest%>",
                    "src":["*-debug.js"],
                    "dest":"<%=path.baseDir%>/<%=path.appDest%>",
                    "rename":function(dest,src){
                        console.log("======================="+src+"====================");
                        var _filename=src.replace("-debug","");
                        return dest+"/"+_filename;
                    }
                }]*/
                files:[{
                     "expand": true,
                     "cwd":"<%=path.baseDir%>/<%=path.appDest%>",
                     "src":["*.js","!*-debug.js"],
                     "dest":"<%=path.baseDir%>/<%=path.appDest%>",
                     /*"rename":function(dest,src){
                     var _filename=src.replace("-debug","");
                     return dest+"/"+_filename;
                     }*/
                    "ext":".min.js"
                 }]
                /*files:{
                    "static/first/dist/main.js":"static/first/dist/main-debug.js"
                }*/
            }
        },
        copy:{
            main:{
                files:[{
                    "expand":true,
                    "cwd":"<%=path.baseDir%>/<%=path.copypath%>/dist",
                    "src":["**"],
                    "dest":"spm_modules/<%=path.baseDir%>/<%=path.copypath%>"
                }]
            }
        }
    });
	//加载Grunt插件
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');



    /*path:{
         baseDir:"static",
         appSrc:"",
         appDest:""
     }*/
    //sass任务
    grunt.registerTask('buildScss',"build ui css",function(appName){
        grunt.log.ok(['start build scss ~']);

        var _src=appName+"/src";
        var _dest=appName+"/dist";

        grunt.config("path.appSrc",_src);
        grunt.config("path.appDest",_dest);

        grunt.task.run("sass");
        grunt.task.run("cssmin");
    });


    grunt.registerTask('buildJs',"build js",function(appName){
        grunt.log.ok(['start build js ~']);

        var _src=appName+"/src";
        var _dest=appName+"/dist";
        var _name=appName;

        grunt.config("path.appSrc",_src);
        grunt.config("path.appDest",_dest);
        grunt.config("path.appName",_name);

        grunt.task.run("transport::app");
        grunt.task.run("concat");
        grunt.task.run("uglify");
    });

    //copy source to fo
    grunt.registerTask('copyApp','copy apps',function(appName){
        grunt.log.ok(['start copy source ~']);

        var _src=appName;

        grunt.config("path.copypath",_src);
        grunt.task.run("copy");

    });

    //
}