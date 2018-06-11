var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const assert =require('assert');
//var express = require('express');
var path = require('path');
var mongo = require('mongodb');
//var bodyParser = require('body-parser');
var crypto = require('crypto');
//Connect to the database
mongoose.connect('mongodb://tushar.snl123:wipro123@ds141320.mlab.com:41320/owner-tenant');
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds139690.mlab.com:39690/tenant');
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds139690.mlab.com:39690/landlord');
//3
//Create a schema - this is like a blueprint
// var todoSchema = new mongoose.Schema({
//   item: String
// });

var tenantSchema = new mongoose.Schema({
  name: String,
  mobileno: Number,
  username: String,
  password: String,
  email: String
  // password: {type: String, required: true},
  // email: { type: String, required: true, unique: true},

})

var OwnerSchema = new mongoose.Schema({
  name: String,
  mobileno: Number,
  username: { type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: String,

})

var ResPropertySchema = new mongoose.Schema({
  type:String,
  area:Number,
  address:String,
  ownName:String,
  status:Boolean,
  contact:Number,
  rent:Number,
  security:Number,
  features:String
})

var ComPropertySchema = new mongoose.Schema({
  type:String,
  area:Number,
  address:String,
  ownName:String,
  status:Boolean,
  contact:Number,
  rent:Number,
  security:Number,
  features:String
})
//var Todo = mongoose.model('Todo', todoSchema);
var tenant = mongoose.model('tenant', tenantSchema);
var owner = mongoose.model('owner', OwnerSchema);
var propertyres = mongoose.model('propertyres',ResPropertySchema );
var propertycom = mongoose.model('propertcom',ComPropertySchema );
 // var itemOne = tenant({name:'Tushar', mobileno:7889201382, username: 'tushar.snl123' , password: 'hey', email: 'tushar.snl123@gmail.com' }).save(function(err){
 //   if(err) throw err;
 //   console.log('item saved');
 // });
//var data = [{item:'get milk'},{item:'Play Basketball'},{item: 'kick some coding ass'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){


// app.get('/todo', function(req,res){
//   //get data from mongodb and pass it to view!!
//   // Todo.find({}, function(err, data){
//   //   if (err) throw err;
//       res.render('todo');
//   }); // All the items in the database




app.get('/', function(req,res){
  res.render('todo');
})

app.get('/contact', function(req,res){
  res.render('contact');
})

app.get('/login-landlord', function(req,res){
  res.render('login-landlord');
})

app.get('/login-tenant', function(req,res){
  console.log("Hey I'm in the get request");
  res.render('login-tenant');
})

app.get('/signup-tenant', function(req,res){

  res.render('signup-tenant');
})



app.get('/signup-landlord', function(req,res){

  res.render('signup-landlord' );
})

//For the Posts requests
// app.post('/todo', urlencodedParser, function(req,res){
//   //get data from view and add it to mongodb
//   var newTodo = Todo(req.body).save(function(err, data){
//     if(err) throw err;
//     res.json(data);
//   });
// });

// app.post('/register', urlencodedParser, function(req,res){
//     var obj = json.stringify(req.body);
//     var jsonObj = json.parse(obj);
//
//     res.render('profile', {loginData:req.body});
// });
//
// app.post('/completeprofile',urlencodedParser, function(req,res){
//   var obj = json.stringify(req.body);
//   console.log("Final reg Data : "+obj);
//   var jsonObj = json.parse(obj);
//
// })

app.post('/signup-tenant', urlencodedParser, function(req,res){
  //get data from view and add it to mongodb
  console.log('Hey Im in the loop');
  console.log(req.body);
  var newTenant = tenant(req.body).save(function(err, data){
    console.log("hello there");
    if(err) {
      console.log("Error Occured");
      res.json(err)
    }
    else{
      console.log("in else");
      //console.log(newTenant); // Have to have a look at this
      //res.json(data);
      res.render('success');
    };
    // res.json(data);
    //res.redirect('success');
  });
});

app.post('/signup-landlord', urlencodedParser, function(req,res){
  //get data from view and add it to mongodb
  console.log('Hey Im in the loop');
  console.log(req.body);
  var newOwner = owner(req.body).save(function(err, data){
    console.log("hello there");
    if(err) {
      console.log("Error Occured");
      res.json(err)
    }
    else{
      console.log("in else");
      console.log("Owner")
      //console.log(newTenant); // Have to have a look at this
      //res.json(data);
      res.render('success');
    };
    // res.json(data);
    //res.redirect('success');
  });
});

app.post('/profile-owner', urlencodedParser, function(req,res){
  //get data from view and add it to mongodb
  console.log('Hey Im in the loop of the property');
  console.log(req.body);
  var newProperty = propertyres(req.body).save(function(err, data){
    console.log("hello there");
    if(err) {
      console.log("Error Occured");
      res.json(err)
    }
    else{
      console.log("in else");
      console.log("Owner")
      //console.log(newTenant); // Have to have a look at this
      //res.json(data);
      res.render('success');
    };
    // res.json(data);
    //res.redirect('success');
  });
});



app.post('/login-tenant', urlencodedParser,function(req,res){
    //get data from mongodb to the View
    console.log("Hey, Im in the profile view");
    console.log(req.body);
   tenant.find({username:req.body.Username}).then( function(result){
            console.log(result[0].name);
            //var newt = result.toObject();
            console.log(req.body.Username)
            //console.log(newt);
            //console.log(tenant.username);
             if(result ===null){
               console.log("Tenant is null");
               res.end("Login invalid");
            }else if (result[0].username === req.body.Username && result[0].password === req.body.Password){
              console.log("Hey need the profile-tenant.ejs file")
            res.render('profile-tenant',{profileData:result[0]});
          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
 // });
});


app.post('/login-landlord', urlencodedParser,function(req,res){
    //get data from mongodb to the View
    console.log("Hey, Im in the profile view-owner");
    console.log(req.body);
   owner.find({username:req.body.Username}).then( function(result){
            console.log(result);
            //var newt = result.toObject();
            console.log(req.body.Username)
            //console.log(newt);
            //console.log(tenant.username);
             if(result ===null){
               console.log("Owner is null");
               res.end("Login invalid");
            }else if (result[0].username === req.body.Username && result[0].password === req.body.Password){
              console.log("Hey need the profile-owner.ejs file")
            res.render('profile-owner',{profileData:result[0]});
          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
 // });
});

app.post('/property-resedential', urlencodedParser,function(req,res){
    //get data from mongodb to the View
    console.log("Hey, Im in the property resedential view");
    console.log(req.body);
   propertyres.find({}).then( function(result){
            console.log(result);
            //var newt = result.toObject();
            //console.log(req.body.Username)
            //console.log(newt);
            //console.log(tenant.username);
             if(result ===null){
               console.log("Property is null");
               res.end("invalid");
            } else {
            console.log("In the Property View");
            res.render('property-resedential',{resdata:result});
          }
   });
      });


app.post('/signup-landlord', urlencodedParser, function(req,res){
  //get data from view and add it to mongodb
  var newOwner = owner(req.body).save(function(err, data){
    if(err) throw err;
    res.json(data);
  });
});
//for Delete Requests
// app.delete('/todo/:item', function(req,res){
//   //delete the requested item from mongodb
//   Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
//     if(err) throw err;
//     res.json(data);
//   });
// });
}
