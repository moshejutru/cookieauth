var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema([ {
        username:'string ' ,                         //'john',
        password:  'string' ,                                                        //'$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',  // 'secret'
        name: 'string',
        id: 'string'                                            //'2133d32a'
    }]
);
var users = mongoose.model('users', UserSchema);
module.exports = {
    users: users
};








/*


var UserSchema = new mongoose.Schema({
    nickname: String,
    reg_time: {type: Date, default: Date.now}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});*/