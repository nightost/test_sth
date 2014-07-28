module.exports=function(grunt){
	grunt.initConfig({
		//read package.json
		pkg:grunt.file.readJSON('package.json'),
		uglify:{
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',				
			},
			build:{
					src:"pages/js/test.js",
					dest:"pages/js-src/test-min.js"
				}
		},
		watch:{
		    js:{
		        files: ["pages/js/test.js"],
		        tasks: ['uglify']
		    }
		}
	});
	//加载Grunt插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //默认的Grunt任务
    grunt.registerTask('default',['uglify']);
    //log text color
    // grunt.log('test color'.green);
}