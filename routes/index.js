const express = require('express');
const router = express.Router();
const api = require('../db/api');


/* GET home page. */
router.get('/', (req, res)=>{
  res.render('index', { title: 'Express', jsPath: 'post', cssPath: 'author'});
});

router.post('/', (req,res)=>{ //подождать здесь 
const makeRequest = async ()=> {
  try{
    const allUsers = await api.checkUser(req.body);
    const newUser = await api.getUser(req.body);
    api.setUserProp('user', 'mute', true);
    const user = await api.getUser({name:'user', pass: '1'});
    console.log(user);
    res.render('chat', { admin: newUser.admin, id:newUser._id, users: allUsers, jsPath: 'chat/chat', cssPath: 'chat', ioPath: 'chat/socket.io'});
  }catch(err){
    res.render('index', { error: err.message, jsPath: 'post', cssPath: 'author'});
  }
}

makeRequest();
  

})

module.exports = router;
