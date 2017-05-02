/**
 * Created by zhangyue on 2017/5/2.
 */

//mongodb
var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1',27017,{});
var client = new mongodb.Db('mydatabase',server,{w:1});
var bson = require('BSON');

client.open(function(err){
	if(err) throw err;
	client.collection('test_insert',function(err,collection){
		if(err) throw err;
		console.log('We are now able to perform queries.');



		collection.insert(
			{
				"title":"I like cake",
				"body":"It is quite good."
			},
			{safe:true},
			function(err,documents){
				if(err) throw err;
				console.log(documents);
				console.log('Document ID is: '+documents.insertedIds[0]);
			}
		);

		var _id = '590897c1448e863893849490';

		collection.update(
			{_id:bson.ObjectID(_id)},
			{$set:{"title":"I ate too much cake"}},
			{safe:true},
			function(err){
				if(err) throw err;
			}
		);

		collection.find({"title":"I like cake"}).toArray(function(err,results){
			if(err) throw err;
			console.log(results);
		});

		collection.remove({_id:bson.ObjectID('590897daaf3719389b3b87a3')},{safe:true},function(err){
			if(err)throw err;
		});

	});
});

