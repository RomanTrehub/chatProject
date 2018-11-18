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
 
getUserId = function(userpass){
	User.find(function (err, users) {
		return users;
	});
}

 
exports.checkUser = async (userData) => {
	try{
		const user = await User.findOne({name: userData.name});

		if (user  && (user.password == userData.pass && user.username == userData.name)){
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