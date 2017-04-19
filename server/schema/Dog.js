var Mongoose = require('mongoose');
// import * as Mongoose from 'mongoose';
var Schema = Mongoose.Schema;
var DogSchema = new Schema({
  name : String,
  age : Number,
  DOB : Date,
  isAlive : Boolean
});
var Dog = Mongoose.model('Dog', DogSchema);

var arvind = new Dog({
  name : 'Arvind',
	account: '123'
});

arvind.save(function (err, data) {
  if (err){
    console.log(err);
  } else {
    console.log('Saved : ', data );
  }
});
