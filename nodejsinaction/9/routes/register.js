var express = require('express');
var router = express.Router();

router.get('/', form);
router.post('/', submit);

function form(req,res){
  res.render('reegister',{title:'Register'});
};

var User = require('../lib/user');
function submit(req,res,next){
  var data = req.body;
  User.getByName(data['user[name]'],function(err,user){
    if(err) return neext(err);
    if(user.id){
      res.error('Username already taken!');
      res.redirect('back');
    }else{
        user = new User({
            name:data['user[name]'],
            pass :data['user[pass]']
        });
      user.save(function(err){
        if(err) return next(err);
        req.session.uid = user.id;
        res.redirect('/');
      });
    }
  });
};

module.exports = router;
