module.exports=function(grunt){
	grunt.initConfig({
        //read package.json
        pkg: grunt.file.readJSON('package.json'),
        path:{
            srcDir:"static"
        },
        //sass css
        sass:{
            main:{
                files:[{
                    "expand": true,
                    "cwd": "static/",
                    "src": ["**/src/*.scss"],
                    "dest": "static/",//生成至源目录
                    "ext":".css"
                }]
            }
        },
        //css min
        cssmin:{
            main:{
                files:[{
                    "expand": true,
                    "cwd": "static/",
                    "src": ["**/src/*.css"],
                    "dest": "spm_modules/static/",//生成至源目录
                    "ext":".min.css"
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
                    "bootstrap-drapdown":"bootstrap/assets/javascripts/bootstrap/dropdown.js"
                },
                debug:false
            },
            app : {
                options : {
                    //前置目录
                    idleading : 'static/'
                },
                files : [{
                    "expand": true,
                    "cwd" : 'static/',
                    "src" : ['**/**.js','**/**.css'],
//                  filter : 'isFile',
                    "dest" : '.build/static'
                }]
            }
        },
        concat:{
            app:{
                options:{
                    include:"relative",
                    paths:["."]
                },
                files:[{
                    expand: true,
                    cwd : '.build/',
                    //Importan concat 查找路径
                    src : ['static/**/*.js'],
//                  filter : 'isFile',
                    dest : 'spm_modules/',
                    ext: '.js'
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
    //sass任务
    grunt.registerTask('buildScss',function(){
        grunt.task.run("sass");
        grunt.task.run("cssmin");
    });

    grunt.registerTask('buildJs',function(){
        grunt.task.run("transport");
        grunt.task.run("concat");
    });

    //transport concat
    grunt.registerTask('buildConcat',['transport','concat'],function(){
        grunt.task.run("transport");
        grunt.task.run("concat");
        grunt.task.run("buildScss");
        grunt.log.ok(['ok了，无哈哈哈哈']);
    });
}