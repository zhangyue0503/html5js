'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	item: _react.PropTypes.object.isRequired,
	onClick: _react.PropTypes.func.isRequired
};

function ListItem(_ref) {
	var item = _ref.item,
	    onClick = _ref.onClick;

	var formatTime = '未知时间';
	if (item.time) {
		formatTime = new Date(item.time).toISOString().match(/(\d{4}-\d{2}-\d{2})/)[1];
	}
	return _react2.default.createElement(
		'a',
		{
			href: '#',
			className: 'list-group-item item-component',
			onClick: onClick
		},
		_react2.default.createElement(
			'span',
			{ className: 'label label-default label-pill pull-xs-right' },
			formatTime
		),
		_react2.default.createElement(
			'span',
			{ className: 'item-title' },
			item.title
		)
	);
}

ListItem.propTypes = propTypes;

exports.default = ListItem;

//# sourceMappingURL=index.js.map