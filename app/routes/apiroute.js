//var Controller = require('../controllers/apicontroller');
var Boom =require('boom');
var Bcrypt = require('bcrypt');
//user = require('../models/apimodel').users;
var Users = require('../models/users-db.js')

exports.endpoints =
    [

    { method: 'GET',
        path: '/',
        config: {
            auth:{
                mode:'try',
                strategy:'session'
            },
            plugins:{
                'hapi-auth-cookie':{redirectTo:false}
            },
            handler:function (request, reply) {

                if (request.auth.isAuthenticated) {
                    return reply('profile')
                }
                reply.view('index')
            }
       }
    },
        { method: 'POST',
            path: '/login',
            config: {
                auth:{
                    mode:'try'

                },
                plugins:{
                    'hapi-auth-cookie':{redirectTo:false}
                },
                handler: function (request, reply) {
               if(request.auth.isAuthenticated){
                   return reply.view('Profile')
               }
                   // console.log('asdsa')
                    var username = request.payload.username;
                   console.log('request.payload', request.payload);
                   // var user = users[0];
                    var user = Users[ username ];
                    if(!user){
                        return reply("no user registered")
                    }
                    var password = request.payload.password;
                    console.log('request.payload', request.payload);
                    return Bcrypt.compare (password,user.password,function(err,isvalid){
                        if(isvalid){
                            request.server.log( 'user authentication success');
                            request.cookieAuth.set(user);
                            return reply.view('profile')

                        }
                        reply.view('index')
                    })

                }
            }
        },
        {
            method: 'GET',
            path: '/logout',
            config: {
                auth:{

                    strategy:'session'
                },
                handler:function (request, reply) {
    request.cookieAuth.clear();
    reply.view('index')
}
}}
 ];


/*GET /api/users
 POST /api/users
 PUT /api/users/:id
 GET /api/users/:id
 DELETE /api/users/:id
 */