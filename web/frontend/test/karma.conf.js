module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'app/js/**/*.js',
      'test/unit/**/*.js',
      'bower_components/jquery/dist/jquery.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
