var colors = require('colors');
var request = require('request');
var util = require('util');
var exec = require('child_process').exec;

var cli = {

  /*!
  * Autenticate
  */
  auth: function(){

    // params
    var params = {
      form: {
        email: process.env.REPORTIFY_EMAIL,
        password: process.env.REPORTIFY_PASSWORD
      }
    };

    // request
    request.post(process.env.REPORTIFY_API, params, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var json = JSON.parse(body);

        // format link
        var link = util.format('http://localhost:8000/demo/auth/?public=%s', json.domains.public);

        // format command
        var command = util.format('open %s', link);

        // execute command
        exec(command, function(error, stdout, stderr) {
          // error
          if (error) {
            cli.error(error);
          }
          else {
            cli.success(command);
          }
        });
      }
    });
  },

  /*!
  * Show error message
  */
  error: function(index) {
    var messages = [
    'Es requerido que escriba un comando.',
    'El comando que ha escrito no existe.',
    'No tiene conexión a Internet',
    ''
    ];
    console.log(colors.red(messages[index]));
  },

  /*!
  * Show success message
  */
  success: function( message ){
    console.log(colors.green(message));
  }
};

module.exports = cli;
