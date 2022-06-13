var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
const { route } = require('.');

router.post('/register',function(req,res){
  //take the data
   const {uid,pwd,email}=req.body 
  //connect with db
  var url='mongodb://localhost:27017';
  var mongoClient=mongo.MongoClient;
  mongoClient.connect(url,function(err,server){
    if(err){
      res.send('db con error')
    }else{
       var db= server.db('postal');
       var collection=db.collection('users');
       collection.insertOne({uid,pwd,email},function(e,s){
          if(e){
            res.send(e);
          }else{
            res.send(s)
          }
       })
    }
  })
     
})


router.post('/login',function(req,res){
 //take the data
    const {uid,pwd}=req.body;
  //conn with db
  var url="mongodb://localhost:27017";
  var mongoClient=mongo.MongoClient;
  mongoClient.connect(url,function(err,server){
    if(err){
      res.send('db con error')
    }else{
       var db=server.db('postal');
      var collection= db.collection('users');
      collection.find({uid,pwd}).toArray(function(e,s){
          if(e){
            res.send(e);
          }else{
            res.send(s);
          }
      })
    }
  })
})


router.delete('/delete',function(req,res){
    var uid= req.query.uid

    var url="mongodb://localhost:27017";
    var mongoClient=mongo.MongoClient;
    mongoClient.connect(url,function(err,server){
      if(err){
        res.send('db con error')
      }else{
        var db=server.db('postal');
        var collection=db.collection('users');
        collection.deleteOne({uid},function(e,s){
            if(e){
              res.send(e);
            }else{
              res.send(s);
            }
        })
      }
    })
})


router.put('/update',function(req,res){
  const {uid,pwd,email} =req.body

  var url="mongodb://localhost:27017";
  var mongoClient=mongo.MongoClient;
  mongoClient.connect(url,function(err,server){
    if(err){
      res.send('db con error')
    }else{
      var db=server.db('postal')
      var collection= db.collection('users');
      collection.updateOne({uid},{$set:{pwd,email}},function(e,s){
        if(e){
          res.send(e);
        }else{
          res.send(s);
        }
      })
    }
  })
})


router.get('/check-uid/:uid',function(req,res){
  //take the data
     const uid=req.params.uid;
   //conn with db
   var url="mongodb://localhost:27017";
   var mongoClient=mongo.MongoClient;
   mongoClient.connect(url,function(err,server){
     if(err){
       res.send('db con error')
     }else{
        var db=server.db('postal');
       var collection= db.collection('users');
       collection.find({uid}).toArray(function(e,s){
           if(e){
             res.send(e);
           }else{
             res.send(s);
           }
       })
     }
   })
 })
 
module.exports = router;
