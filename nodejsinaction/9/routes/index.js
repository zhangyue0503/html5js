var express = require('express');
var router = express.Router();
var validate = require('../lib/middleware/validate');

var page = require('../lib/middleware/page');
var Entry = require('../lib/entry');



router.get('/post', eform);
router.post('/post',
    validate.required('entry[title]'),
    validate.lengthAbove('entry[title]',4),
    esubmit);

router.get('/login',form);
router.post('/login',submit);
router.get('/logout',logout);

router.get('/:page?', page(Entry.count,5), list);

function form(req,res){
  res.render('login',{title:'Login'});
};

function eform(req,res){
  res.render('post',{title:'Post'});
};


function list(req,res,next){
  var page = req.page;
  Entry.prototype.getRange(page.from,page.to,function(err,entries){
    if(err) return next(err);
    res.render('entries',{
      title:'Entries',
      entries:entries
    });
  });
};

function esubmit(req,res,next){
  var data = req.body;

  var entry = new Entry({
    "username":res.locals.user.name,
    "title":data['entry[title]'],
    "body":data['entry[body]'],
  });
  entry.save(function(err){
    if(err) return next(err);
    res.redirect('/');
  });
};


var User = require('../lib/user');
function submit(req,res,next){
  var data = req.body;
  User.authenticate(data['user[name]'],data['user[pass]'],function(err,user){
    if(err) return next(err);
    if(user){
      req.session.uid = user.id;console.log("aa");
      res.redirect('/');
    }else{
      res.error("Sorry! invalid credentials.");console.log("bb");
      res.redirect('back');
    }
  });
};

function logout(req,res){
  req.session.destroy(function(err){
    if(err) throw err;
    res.redirect('/');
  });
};



module.exports = router;
