//'use strict';

const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
const JS = path.join(__dirname, 'js/browser.js');
const favicon = require('serve-favicon');
//--------------------------------------------------------- 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://has:mik@ds163612.mlab.com:63612/ifindyou";

const app = express();
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.get("/", function (req, res) {
  res.redirect('https://findonmap.herokuapp.com');
    //res.sendFile(INDEX);
})
app.listen( PORT );
console.log('listening on port ...', PORT);
 /*  .get("/js/browser.js", function (req, res) {
    res.sendFile(JS);
  })
  .use(bodyParser.urlencoded({
    extended: false
  })) //.use(bodyParser())
  //-------------------------------------------------------------------------------------
  .post('/reg', require('./reg').reg)
  //-------------------------------------------------------------------------------------
  .post('/login', require('./login').login)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
//---------------------------------------------------------------------
const wss = new WebSocket({
  server
});
var clients = {};

wss.on('connection', (ws) => {
  //---------------------------------------------------
  var id = Math.random();
  console.log("\n =======================  новое соединение  ======================  " + id);
  clients[id] = [ws, null, null];
  ws.send(JSON.stringify({
    type: 'id'
  }));
  //---------------------------------------------------
  ws.on('message', (message) => {
    console.log('\n получено сообщение ' + message);
    var m = JSON.parse(message);

    if (m.type == 'id')
      if (m.name == undefined) {
        clients[id][0].send(JSON.stringify({
          type: 'id'
        }));
      } else {
        clients[id][1] = m.name;

        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          db.collection("fav").find({
            me: m.name
          }).toArray((err, result) => {
            if (err) throw err;

            if (result !== null) {
              var fr = [];
              for (var i = 0; i < result.length; i++)
                fr.push(result[i].fr);
            }

            clients[id][2] = fr;
            db.close();
          });
        });
        for (var key in clients)
          console.log('...................... ' + clients[key][1] + ' ... is active client .................\n');
      }
    //--------------------------------------------------------
    if (m.type == 'chat') {
      console.log('server resieved chat');
      for (var key in clients) {
        if (clients[key][1] == m.to) {
          clients[key][0].send(message);
        }
      }
    }
    //--------------------------------------------------------
    if (m.type == 'fr') {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var myobj = {
          me: m.me,
          fr: m.fr
        };
        db.collection("fav").insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log("1 record inserted");
          db.close();
        });
      });
    }
    //--------------------------------------------------------
    if (m.type == 'd_fr') {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var myobj = {
          me: m.me,
          fr: m.fr
        };
        db.collection("fav").deleteOne(myobj, function (err, res) {
          if (err) throw err;
          console.log("\n 1 record inserted");
          db.close();
        });
      });
    }
    //--------------------------------------------------------
    if (m.type == 'geo') {
      console.log('\n you-> ' + clients[id][1] + '   your friend-> ' + clients[id][2]);
      console.log(message);
      clients[id][0].send(message);

      for (var key in clients) {
        for (var i = 0; i < clients[id][2].length; i++) {
          if (clients[id][2][i] == clients[key][1]) {
            clients[key][0].send(message);
          }
        }
      }
    }
    //--------------------------------------------------------                                                       
  });
  //---------------------------------------------
  ws.on('close', function () {
    console.log('\n --------------------------   соединение закрыто ----------------------  ' + clients[id][1]);
    for (var key in clients) {
      console.log('\n ' + clients[key][1]);
      for (var i = 0; i < clients[id][2].length; i++) {
        if (clients[key][1] == clients[id][2][i]) {
          console.log('\n ' + JSON.stringify({
            type: 'geo',
            name: clients[id][1],
            lt: null,
            lg: null
          }));
          clients[key][0].send(JSON.stringify({
            type: 'geo',
            name: clients[id][1],
            lt: null,
            lg: null
          }));
        }
      }
    }

    delete clients[id];
    //------------------------------------
    for (var key in clients)
      console.log('\n ................  client is .............' + clients[key][1]);
  });
}); */