module.exports = function(grunt){
	grunt.initConfig({
		jshint:{
			src:'1.es6.js'
		},
		uglify:{
			build:{
				src:'1.es6.js',
				dest:'1.es6.grunt.js'
			}
		}
	});

	grunt.loadnpmTasks('grunt-contrib-uglify');
	grunt.loadnpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default',['jshint','uglify']);

}