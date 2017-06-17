'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

require('./style.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	onClick: _react.PropTypes.func.isRequired
};

function CreateBar(_ref) {
	var onClick = _ref.onClick;

	return _react2.default.createElement(
		'a',
		{ href: '#', onClick: onClick, className: 'list-group-item create-bar-component' },
		'+ \u521B\u5EFA\u65B0\u7684\u6587\u7AE0'
	);
}

CreateBar.propTypes = propTypes;

exports.default = CreateBar;

//# sourceMappingURL=index.js.map