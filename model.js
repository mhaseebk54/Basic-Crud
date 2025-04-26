const mongoose = require ('mongoose');

mongoose.connect(`mongodb://localhost:27017/ejscrud`);

const userSchema = mongoose.Schema({ 
name : String,
email : String,
image: String,


})

const User =  mongoose.model("user", userSchema)  
module.exports = User;
