'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ele = document.createElement('div');
document.body.appendChild(ele);
var props = {
	name: 'viking',
	age: 20
};

(0, _reactDom.render)(_react2.default.createElement(_Profile2.default, props), ele);

// import React from 'react';
// import ReactDOM from 'react-dom';
//
//
// class App extends React.Component {
// 	constructor(props) {
// 		super(props);
// 	}
//
// 	render() {
// 		return (
// 			<div className="container">
// 				<h1>Hello React!</h1>
// 			</div>
// 		)
// 	}
// };
//
// const app = document.createElement('div');
// document.body.appendChild(app);
// ReactDOM.render(<App />, app);

//# sourceMappingURL=app.js.map