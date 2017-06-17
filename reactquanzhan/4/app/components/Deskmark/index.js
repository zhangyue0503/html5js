'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = require('/Users/zhangyue/MyProject/html5js/reactquanzhan/4/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/Users/zhangyue/MyProject/html5js/reactquanzhan/4/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/Users/zhangyue/MyProject/html5js/reactquanzhan/4/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _CreateBar = require('../CreateBar');

var _CreateBar2 = _interopRequireDefault(_CreateBar);

var _List = require('../List');

var _List2 = _interopRequireDefault(_List);

var _ItemEditor = require('../ItemEditor');

var _ItemEditor2 = _interopRequireDefault(_ItemEditor);

var _ItemShowLayer = require('../ItemShowLayer');

var _ItemShowLayer2 = _interopRequireDefault(_ItemShowLayer);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
	App: {
		displayName: 'App'
	}
};

var _UsersZhangyueMyProjectHtml5jsReactquanzhan4Node_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	filename: '/Users/zhangyue/MyProject/html5js/reactquanzhan/4/app/components/Deskmark/index.jsx',
	components: _components,
	locals: [module],
	imports: [_react3.default]
});

var _UsersZhangyueMyProjectHtml5jsReactquanzhan4Node_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	filename: '/Users/zhangyue/MyProject/html5js/reactquanzhan/4/app/components/Deskmark/index.jsx',
	components: _components,
	locals: [],
	imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
	return function (Component) {
		return _UsersZhangyueMyProjectHtml5jsReactquanzhan4Node_modulesReactTransformHmrLibIndexJs2(_UsersZhangyueMyProjectHtml5jsReactquanzhan4Node_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	};
}

var App = _wrapComponent('App')(function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			items: [],
			selectedId: null,
			editing: false
		};

		_this.selectItem = _this.selectItem.bind(_this);
		_this.saveItem = _this.saveItem.bind(_this);
		_this.deleteItem = _this.deleteItem.bind(_this);
		_this.createItem = _this.createItem.bind(_this);
		_this.editItem = _this.editItem.bind(_this);
		_this.cancelEdit = _this.cancelEdit.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: 'selectItem',
		value: function selectItem(id) {
			if (id === this.state.selectedId) {
				return;
			}

			this.setState({
				selectedId: id,
				editing: false
			});
		}
	}, {
		key: 'saveItem',
		value: function saveItem(item) {
			var items = this.state.items;

			// new item
			if (!item.id) {
				items = [].concat(_toConsumableArray(items), [_extends({}, item, {
					id: _uuid2.default.v4(),
					time: new Date().getTime()
				})]);
				// existed item
			} else {
				items = items.map(function (exist) {
					return exist.id === item.id ? _extends({}, exist, item) : exist;
				});
			}

			this.setState({
				items: items,
				selectedId: item.id,
				editing: false
			});
		}
	}, {
		key: 'deleteItem',
		value: function deleteItem(id) {
			if (!id) {
				return;
			}

			this.setState({
				items: this.state.items.filter(function (result) {
					return result.id !== id;
				})
			});
		}
	}, {
		key: 'createItem',
		value: function createItem() {
			this.setState({
				selectedId: null,
				editing: true
			});
		}
	}, {
		key: 'editItem',
		value: function editItem(id) {
			this.setState({
				selectedId: id,
				editing: true
			});
		}
	}, {
		key: 'cancelEdit',
		value: function cancelEdit() {
			this.setState({ editing: false });
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    items = _state.items,
			    selectedId = _state.selectedId,
			    editing = _state.editing;

			var selected = selectedId && items.find(function (item) {
				return item.id === selectedId;
			});
			var mainPart = editing ? _react3.default.createElement(_ItemEditor2.default, {
				item: selected,
				onSave: this.saveItem,
				onCancel: this.cancelEdit
			}) : _react3.default.createElement(_ItemShowLayer2.default, {
				item: selected,
				onEdit: this.editItem,
				onDelete: this.deleteItem
			});

			return _react3.default.createElement(
				'section',
				{ className: 'deskmark-component' },
				_react3.default.createElement(
					'nav',
					{ className: 'navbar navbar-fixed-top navbar-dark bg-inverse' },
					_react3.default.createElement(
						'a',
						{ className: 'navbar-brand', href: '#' },
						'Deskmark App'
					)
				),
				_react3.default.createElement(
					'div',
					{ className: 'container' },
					_react3.default.createElement(
						'div',
						{ className: 'row' },
						_react3.default.createElement(
							'div',
							{ className: 'col-md-4 list-group' },
							_react3.default.createElement(_CreateBar2.default, { onClick: this.createItem }),
							_react3.default.createElement(_List2.default, {
								items: this.state.items,
								onSelect: this.selectItem
							})
						),
						mainPart
					)
				)
			);
		}
	}]);

	return App;
}(_react3.default.Component));

exports.default = App;

//# sourceMappingURL=index.js.map