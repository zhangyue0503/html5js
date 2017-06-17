'use strict';

require('babel-polyfill');

require('bootstrap/scss/bootstrap.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Deskmark = require('components/Deskmark');

var _Deskmark2 = _interopRequireDefault(_Deskmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = document.createElement('div');
document.body.appendChild(app);
_reactDom2.default.render(_react2.default.createElement(_Deskmark2.default, null), app);

//# sourceMappingURL=app.js.map