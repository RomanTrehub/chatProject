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
	const user = await User.findOne({_id: userId});
	return user;

}

exports.getUser = async (userData) =>{
	const user = await User.findOne({username: userData.name, password: userData.pass});
	return user;

}

 
exports.checkUser = async (userData) => {
	try{

		if (userData.name.length < 3 || userData.name.match(/[\. \^ \$ \* \+ \? \{ \} \[ \] \\ \| \( \)\#\&\@\!\;\:\=]/)){
			throw new Error('Имя должно быть больше 3-х символов и не содержать специальные символы!')
		}

		const user = await User.findOne({username: userData.name});
		if (user) {
			if (userData.pass !== user.password) {
				throw new Error('Неверно введенный пароль');					
			}
			if (user.ban) {
				throw new Error('К сожалению, вы забанены!');
			}
			console.log("User password is ok");
			return User.find();
		} else {
			console.log("createUser");
			return	createUser(userData);
			//User.find(function (err, users) {
				//console.log(users)
			//});
		}
	}catch(err){
		throw err;
	}

}