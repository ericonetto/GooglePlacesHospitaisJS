var mongoose    =   require("mongoose");
mongoose.connect('mongodb://45.55.133.138:27017/mcinterface');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "userEmail" : String,
    "userPassword" : String
};
// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);