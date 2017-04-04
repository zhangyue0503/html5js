/**
 * Created by zhangyue on 2017/3/30.
 */


'use strict';
var configRoutes,
	crud = require('./crud'),
	chat = require('./chat'),
	makeMongoId = crud.makeMongoId;

configRoutes = function (app, server) {
	app.get('/', function (request, response) {
		response.redirect('spa.html');
	});

	app.all('/:obj_type/*?', function (request, response, next) {
		response.contentType('json');
		// if (objTypeMap[request.params.obj_type]) {
		// 	next();
		// } else {
		// 	response.send({error_msg : request.params.obj_type + ' is not a valid object type'});
		// }
		next();
	});

	app.get('/:obj_type/list', function (request, response) {
		crud.read(
			request.params.obj_type,
			{},{},
			function(map_list){response.send(map_list);}
		);

		// ;
		// dbHandle.collection(
		// 	request.params.obj_type,
		// 	function (outer_error, collection) {
		// 		collection.find().toArray(
		// 			function (inner_error, map_list) {
		// 				response.send(map_list);
		// 			}
		// 		);
		// 	}
		// );

		// response.send({title:request.params.obj_type+' list'});
	});
	app.post('/:obj_type/create', function (request, response) {
		crud.construct(
			request.params.obj_type,
			request.body,
			function(result_map){response.send(result_map);}
		);

		// var obj_type = request.params.obj_type,
		// 	obj_map  = request.body;
		// checkSchema(obj_type, obj_map,
		// 	function (error_list) {
		// 		if (error_list.length === 0) {
		// 			dbHandle.collection(
		// 				obj_type,
		// 				function (outer_error, collection) {
		// 					var options_map = {safe : true};
		// 					collection.insert(
		// 						obj_map,
		// 						options_map,
		// 						function (inner_error, result_map) {
		// 							response.send(result_map);
		// 						}
		// 					);
		// 				}
		// 			);
		// 		} else {
		// 			response.send({
		// 				error_msg  : "Input document not valid.",
		// 				error_list : error_list
		// 			});
		// 		}
		// 	});


		// response.send({title:request.params.obj_type+' created'});
	});
	app.get('/:obj_type/read/:id([0-9]+)', function (request, response) {
		crud.read(
			request.params.obj_type,
			{_id:makeMongoId(request.params.id)},{},
			function(map_list){response.send(map_list);}
		);

		// var find_map = {_id : makeMongoId(request.params.id)};
		// dbHandle.collection(
		// 	request.params.obj_type,
		// 	function (outer_error, collection) {
		// 		collection.findOne(
		// 			find_map,
		// 			function (inner_error, result_map) {
		// 				response.send(result_map);
		// 			}
		// 		);
		// 	}
		// );

		// response.send({
		// 	title:request.params.obj_type+' with id '+request.params.id+' found'
		// });
	});
	app.post('/:obj_type/update/:id([0-9]+)', function (request, response) {
		crud.update(
			request.params.obj_type,
			{_id:makeMongoId(request.params.id)},request.body,
			function(result_map){response.send(result_map);}
		);

		// var find_map = {_id : makeMongoId(request.params.id)},
		// 	obj_type = request.params.obj_type,
		// 	obj_map  = request.body;
		// checkSchema(obj_type, obj_map,
		// 	function (error_list) {
		// 		if (error_list.length === 0) {
		// 			dbHandle.collection(
		// 				request.params.obj_type,
		// 				function (outer_error, collection) {
		// 					var sort_order  = [],
		// 						options_map = {
		// 							'new' : true, upsert : false, safe : true
		// 						};
		// 					collection.findAndModify(
		// 						find_map,
		// 						sort_order,
		// 						obj_map,
		// 						options_map,
		// 						function (inner_error, result_map) {
		// 							response.send(result_map);
		// 						}
		// 					);
		// 				}
		// 			);
		// 		} else {
		// 			response.send({
		// 				error_msg  : "Input document not valid.",
		// 				error_list : error_list
		// 			});
		// 		}
		// 	});

		// response.contentType('json');
		// response.send({
		// 	title:request.params.obj_type+' with id '+request.params.id+' updated'
		// });
	});
	app.get('/:obj_type/delete/:id([0-9]+)', function (request, response) {
		crud.destroy(
			request.params.obj_type,
			{_id:makeMongoId(request.params.id)},
			function(result_map){response.send(result_map);}
		);

		// var find_map = {_id : makeMongoId(request.params.id)};
		// dbHandle.collection(
		// 	request.params.obj_type,
		// 	function (outer_error, collection) {
		// 		var options_map = {
		// 			safe : true, single : true
		// 		};
		// 		collection.remove(
		// 			find_map,
		// 			options_map,
		// 			function (inner_error, result_map) {
		// 				response.send(result_map);
		// 			}
		// 		);
		// 	}
		// );
		// response.contentType('json');
		// response.send({
		// 	title:request.params.obj_type+' with id '+request.params.id+' deleted'
		// });
	});
	chat.connect(server);
};

module.exports = {configRoutes : configRoutes};

