'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListItem = require('../ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	items: _react.PropTypes.array.isRequired,
	onSelect: _react.PropTypes.func.isRequired
};

function List(_ref) {
	var items = _ref.items,
	    onSelect = _ref.onSelect;

	var itemsContent = items.map(function (item) {
		return _react2.default.createElement(_ListItem2.default, {
			item: item,
			key: item.id,
			onClick: function onClick() {
				return onSelect(item.id);
			}
		});
	});

	return _react2.default.createElement(
		'div',
		{ className: 'list-component' },
		itemsContent
	);
}

List.propTypes = propTypes;

exports.default = List;

//# sourceMappingURL=index.js.map