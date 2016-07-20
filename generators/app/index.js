'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the good ' + chalk.red('generator-react-redux-webpack') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('react-redux-webpack'),
      this.destinationPath('react-redux-webpack')
    );
    this.fs.copy(
      this.templatePath('react-redux-webpack/.babelrc'),
      this.destinationPath('react-redux-webpack/.babelrc')
    );
  },

  // install: function () {
  //   this.log(yosay(
  //     process.cwd()
  //   ));
  //   this.installDependencies({
  //     'bower': false,
  //     'npm': true
  //   });
  // }
});
