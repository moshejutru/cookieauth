

var Hapi = require('hapi');

var server = new Hapi.Server();
var Vision = require('vision');
//var config = require ('./app/config/config.js');
//var mongoose = require ('./app/config/mongoose.js');
var CookieAuth = require('hapi-auth-cookie');
var BasicAuth = require('hapi-auth-basic');
// start your server
server.connection({host: "localhost", port: 9000});

// register plugins to server instance
server.register([ {register:Vision},

              {register:CookieAuth}
],function (err) {
    if (err) {

        server.log('error', 'failed to install plugins');
        throw err
    }
    server.log( 'Plugins registered');
    var Vision = require('vision');
    var Handlebars = require('handlebars');
    server.register(Vision, function (err) {
        if (err) {
            console.log('Cannot register vision')

        }
    });

    server.views({
        engines: {ejs: require('ejs')},
        relativeTo: __dirname,
        path: './app/views'
    });


    const users = {
        john: {
            username: 'john',
            password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',  // 'secret'
            name: 'Mohan',
            id: '2133d32a'
        }
    };


    server.auth.strategy('session', 'cookie', true, {
        password: 'm!*"2/),p4:xDs%KEgVr7;e#85Ah^WYC',
        cookie: 'future-studio-hapi-cookie-auth-example',
        redirectTo: '/',
        isSecure: false,
        validateFunc:function (request, session, callback) {

            var username = session.username;
            var user = users[username];
            if (!user) {
                return callback(null, false);
            }
            server.log( 'user authenticated');

            callback(null, true, user);
        }

});
    server.log( 'registered auth strategy:cookie auth');


    var route = require('./app/routes/apiroute.js');
    server.route(route.endpoints);
    server.log('Routes registered');


    server.start(function (err) {
        if (err) {
            throw err
        }

        console.log('Server running at: ' + server.info.uri)
    })
});







