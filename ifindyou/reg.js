var User = require('./users');
var async = require('async');
var mongoose = require('mongoose');
var url = "mongodb://has:mik@ds163612.mlab.com:63612/ifindyou";
mongoose.connect(url);

exports.reg =  function (req, res) {
  
  var memb = new User(req.body);
  console.log('memb -- ' + memb);

  async.waterfall([
    function(callback) {
        callback(null, memb.username);
    },
    function(mmb_1,  callback) {
        //console.log(mmb_1);
        User.findOne({username:mmb_1}, function (err, mmb_2) {
          console.log('---------------- mmb2 ' + mmb_2);
          if (err) return handleError(err);
          callback(null, mmb_2);
        }); 
    },
    function(mmb_2, callback) {
        //console.log(mmb_2);
        if (mmb_2) {
          res.end('Այդպիսի անունով օգտատեր արդեն կա։');
        } else {
            memb.save(function(err, memb, affected){
                if(err) console.log(err.errmsg); 
                callback(null, affected);
            });
        }    
    }
  ], function (err, result) {
     res.end('Դուք հաջողությամբ գրանցվել եք։');
  });
}

//----------------------------------------------
 /*.post('/reg', function (req, res) {
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
                    db.collection('user').count({login:req.body.login}, (error, numOfDocs)=>{
                          if (error) throw error;
                          if(numOfDocs !== 0) 
                          {
                            res.send('Օգտատիրոջ այդ անունը զբաղված է։');
                            db.close(); 
                            return;
                          }
                          db.collection("user").insertOne(req.body, function(err, res) {
                              if (err) throw err; 
                              console.log("\n 1 record inserted");
                              db.close();  
                          });   
                          res.send('Դուք հաջողությամբ գրանցվել եք։');
                    });
                   
        });
    })*/
/*
exports.reg =  function (req, res) {
      //---------------------------------------------------------
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://has:mik@ds163612.mlab.com:63612/ifindyou";
      //---------------------------------------------------------
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
                    db.collection('user').count({login:req.body.login}, (error, numOfDocs)=>{
                          if (error) throw error;
                          if(numOfDocs !== 0) 
                          {
                            res.send('Օգտատիրոջ այդ անունը զբաղված է։');
                            db.close(); 
                            return;
                          }
                          db.collection("user").insertOne(req.body, function(err, res) {
                              if (err) throw err; 
                              console.log("\n 1 record inserted");
                              db.close();  
                          });   
                          res.send('Դուք հաջողությամբ գրանցվել եք։');
                    });
                   
        });
}
*/