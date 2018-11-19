const express = require('express');
const router = express.Router();
const api = require('../db/api');


/* GET home page. */
router.get('/', (req, res)=>{
  res.render('index', { title: 'Express', jsPath: 'post', cssPath: 'author'});
});

router.post('/', (req,res)=>{ //подождать здесь 
console.log(req.body);
const makeRequest = async ()=> {
  try{
  const allUsers = await api.checkUser(req.body);
  const newUser = await api.getUser(req.body);
  res.render('chat', {user:newUser._id, users: allUsers, jsPath: 'chat/chat', cssPath: 'chat', ioPath: 'chat/socket.io'});
  }catch(err){
    return err;
  }
}

makeRequest();
  

})

module.exports = router;
