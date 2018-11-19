const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/chat');
const User = require ('./User');

createUser = async (userData)=>{
	const user = {
		username: userData.name,
		password: userData.pass
	}

	try {
		await new User(user).save();
		return User.find();
	}catch(err){
		return err;
	}

}
 
exports.getUserById = async (userId) =>{
	const user = await User.find({_id: userId});
	return user[0];

}

exports.getUser = async (userData) =>{
	const user = await User.find({username: userData.name, password: userData.pass});
	return user[0];

}

 
exports.checkUser = async (userData) => {
	try{
		const user = await User.findOne({username: userData.name, password: userData.pass});

		if (user){
			console.log("User password is ok");
			return User.find();
		} else {
			return	createUser(userData);
			//User.find(function (err, users) {
				//console.log(users)
			//});
		}
	}catch(err){
		return err
	}

}