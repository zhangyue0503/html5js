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

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
	ItemEditor: {
		displayName: 'ItemEditor'
	}
};

var _UsersZhangyueMyProjectHtml5jsReactquanzhan4Node_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	filename: '/Users/zhangyue/MyProject/html5js/reactquanzhan/4/app/components/ItemEditor/index.jsx',
	components: _components,
	locals: [module],
	imports: [_react3.default]
});

var _UsersZhangyueMyProjectHtml5jsReactquanzhan4Node_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	filename: '/Users/zhangyue/MyProject/html5js/reactquanzhan/4/app/components/ItemEditor/index.jsx',
	components: _components,
	locals: [],
	imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
	return function (Component) {
		return _UsersZhangyueMyProjectHtml5jsReactquanzhan4Node_modulesReactTransformHmrLibIndexJs2(_UsersZhangyueMyProjectHtml5jsReactquanzhan4Node_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	};
}

var propTypes = {
	item: _react2.PropTypes.object,
	onSave: _react2.PropTypes.func.isRequired,
	onCancel: _react2.PropTypes.func.isRequired
};

var ItemEditor = _wrapComponent('ItemEditor')(function (_React$Component) {
	_inherits(ItemEditor, _React$Component);

	function ItemEditor() {
		_classCallCheck(this, ItemEditor);

		return _possibleConstructorReturn(this, (ItemEditor.__proto__ || Object.getPrototypeOf(ItemEditor)).apply(this, arguments));
	}

	_createClass(ItemEditor, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    onSave = _props.onSave,
			    onCancel = _props.onCancel;


			var item = this.props.item || {
				title: '',
				content: ''
			};

			var saveText = item.id ? '保存' : '创建';

			var save = function save() {
				onSave(_extends({}, item, {
					title: _this2.refs.title.value,
					content: _this2.refs.content.value
				}));
			};

			return _react3.default.createElement(
				'div',
				{ className: 'col-md-8 item-editor-component' },
				_react3.default.createElement(
					'div',
					{ className: 'control-area' },
					_react3.default.createElement(
						'button',
						{ onClick: save, className: 'btn btn-success' },
						saveText
					),
					_react3.default.createElement(
						'button',
						{ onClick: onCancel, className: 'btn secondary' },
						'\u53D6\u6D88'
					)
				),
				_react3.default.createElement(
					'div',
					{ className: 'edit-area' },
					_react3.default.createElement('input', { ref: 'title', placeholder: '\u8BF7\u586B\u5199\u6807\u9898', defaultValue: item.title }),
					_react3.default.createElement('textarea', { ref: 'content', placeholder: '\u8BF7\u586B\u5199\u5185\u5BB9', defaultValue: item.content })
				)
			);
		}
	}]);

	return ItemEditor;
}(_react3.default.Component));

ItemEditor.propTypes = propTypes;

exports.default = ItemEditor;

//# sourceMappingURL=index.js.map