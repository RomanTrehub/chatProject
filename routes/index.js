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
  const data = await api.checkUser(req.body);
  console.log(data)
  res.render('chat', {users: data, jsPath: 'chat/chat', cssPath: 'chat', ioPath: 'chat/socket.io'});
  }catch(err){
    return err;
  }
}

makeRequest();
  

})

module.exports = router;
