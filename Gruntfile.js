var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'src',
  dist: 'dist'
}

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: {
      "directory": "./",
      "json": "bower.json"
    },
    copy: {
      dist: {
       files: [{
         expand: true,
         cwd: '<%= config.app %>',
         src: '**/*',
         dest: '<%= config.dist %>'
       }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> -' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          '<%= config.dist %>/js/ng-silo.min.js': [
            '<%= bower.directory %>/js/factory/TableFactory.js',
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'copy',
    'uglify'
  ]);
};
