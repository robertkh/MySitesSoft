var User = require('./users');
var async = require('async');
var mongoose = require('mongoose');
var url = "mongodb://has:mik@ds163612.mlab.com:63612/ifindyou";
mongoose.connect(url);

exports.login = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  
  async.waterfall([
    function(callback) {
        callback(null, username, password);
    },
    function(username, password,  callback) {
        //console.log('arg1 ========  '+ arg1 + '   arg2  ----------------' + arg2);
        User.findOne({username:username}, function (err, user) {
          if (err) return handleError(err);
          if(!user) {
              res.end('0');
              console.log('user not found');
              return;
          } else {
            callback(null, user, password);  
            console.log('user  founds');            
          }
        }); 
    },
    function(user, password, callback) {
        if(user.checkPassword(password)) {
          callback(null, user);
          console.log('password correct  ----------------' + password);
        } else {
          res.end('1');
          console.log('password incorrect  ----------------');
        }    
    }
  ], function (err, user) {
        res.end(user.username);
  });
}

/*exports.login = function (req, res) {
         
          //---------------------------------------------------------
          var MongoClient = require('mongodb').MongoClient;
          var url = "mongodb://has:mik@ds163612.mlab.com:63612/ifindyou";
          //---------------------------------------------------------
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            console.log(req.body);
              
                db.collection('user').count(req.body, function(error, numOfDocs){
                      if (error) throw error;
                      console.log('\n num of docs   ->   ' + numOfDocs);
                      if(numOfDocs == 0)
                          res.send('0');
                      else
                      {
                        console.log("\n" + req.body.login);
                        res.send(req.body.login);
                      }
                });
              
            db.close();      
          });
}*/