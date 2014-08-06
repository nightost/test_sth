module.exports=function(grunt){
	grunt.initConfig({
		//read package.json
		pkg:grunt.file.readJSON('package.json'),
		uglify:{
			options:{
				//banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',				
			},
			build:{
					src:"pages/js/test.js",
					dest:"pages/js-src/test-min.js"
				},
			buildbeef:{
					src:"pages/js-concat-test/dest/eatBeef.js",
					dest:"pages/js-concat-test/dest/eatBeef-min.js"
			},
			rCompress:{
				src:["pages/r-compress/json-jsv-url.js"],
				dest:"pages/r-compress/json-jsv-url-min.js"
			}
		},
		concat:{
			dist:{
				// src:["pages/js-concat-test/src/common.js","pages/js-concat-test/src/eatBeefNew.js"],
				src:["pages/js-concat-test/src/*.js"],
				dest:"pages/js-concat-test/dest/eatBeef.js"
			},
			zeptoCommon:{
				src:["pages/js-concat-test/dest/eatBeef-min.js","pages/js-concat-test/dest/zepto.min.js"],
				dest:"pages/js-concat-test/dest/Zepto-eatBeef-min.js"
			},
			rCompress:{
				src:["pages/r-compress/*.js"],
				dest:"pages/r-compress/json-jsv-url.js"
			}
		},
		jshint:{
			options:{
		        '-W033': true 
		     },
            rCompressHint:["pages/r-compress/test-hint.js"]
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    

    //默认的Grunt任务
    grunt.registerTask('default',function(){
    	grunt.log.write('grunt default...').ok();
    });
     grunt.registerTask('rCompress',"json jsv url",['concat:rCompress','uglify:rCompress'],function(){
    	grunt.log.write('grunt default...').ok();
    });
    //log text color
    // grunt.log('test color'.green);
}