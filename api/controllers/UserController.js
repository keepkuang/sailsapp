/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    //action - login
  login: async function(req,res){
    if(req.session.username){
      return res.redirect('/user/information/'+req.session.uid);
    }
    if(req.method ==='GET')
    {return res.view('user/login');}

    if(!req.body.username || !req.body.password )
    {return res.badRequest();}

    var user = await User.findOne({username:req.body.username});
    if(!user)
    {return res.status(401).send('User not found');}

    const match = await sails.bcrypt.compare(req.body.password, user.password);
    if(!match)
    {return res.status(401).send('Wrong Password');}

    req.session.regenerate((err) => {
      if(err) {return res.serverError(err);}


      req.session.uid = user.id;
      req.session.username = req.body.username;
      req.session.role = user.role;
      sails.log('[Session]',req.session);
      if(req.wantsJSON){
        return res.json({message:'Login successfully.',username:user.username,id:user.id,url:'person/index'});
      }
      return res.redirect('person/index');
    });


  },

    logout: async function (req, res) {

        req.session.destroy(function (err) {
        
            if (err) return res.serverError(err);
            
            return res.ok("Log out successfully.");
            
        });
    },

//action - admin
admin: async function(req,res){
  var models = await User.find();

  if(!models){
    return res.notFound();
  }

  return res.view('user/admin',{userList:models});
},


  //action - sign up
  signup: async function(req,res){

    if(req.method==='GET'){
      return res.view('user/signup');
    }

    model = req.body.User;
    sails.bcrypt = require('bcryptjs');
    const saltRounds = 10;
    const hash = await sails.bcrypt.hash(model.password, saltRounds);
    model.password =hash;

    await User.create(model);

    var user = await User.findOne({username:model.username});

    req.session.regenerate((err) => {
      if(err) {return res.serverError(err);}

      req.session.uid = user.id;
      req.session.username = user.username;
      req.session.role = user.role;
      sails.log('[Session]',req.session);
      return res.redirect('/');
    });

  },

//action - check
check: async function(req,res){

  if(req.wantsJSON){

    var username = req.params.username;

    var user  = await User.findOne({username:username});

    if(!user){
      return res.json({message:'ok'});
    }else{
      return res.json({message:'no'});

    }
  }else{
    return res.redirect('user/login');
  }

},



};

