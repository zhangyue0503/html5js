'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = require('/Users/zhangyue/MyProject/html5js/reactquanzhan/3/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/Users/zhangyue/MyProject/html5js/reactquanzhan/3/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/Users/zhangyue/MyProject/html5js/reactquanzhan/3/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Hobby = require('./Hobby');

var _Hobby2 = _interopRequireDefault(_Hobby);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
	Profile: {
		displayName: 'Profile'
	}
};

var _UsersZhangyueMyProjectHtml5jsReactquanzhan3Node_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	filename: '/Users/zhangyue/MyProject/html5js/reactquanzhan/3/app/Profile.jsx',
	components: _components,
	locals: [module],
	imports: [_react3.default]
});

var _UsersZhangyueMyProjectHtml5jsReactquanzhan3Node_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	filename: '/Users/zhangyue/MyProject/html5js/reactquanzhan/3/app/Profile.jsx',
	components: _components,
	locals: [],
	imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
	return function (Component) {
		return _UsersZhangyueMyProjectHtml5jsReactquanzhan3Node_modulesReactTransformHmrLibIndexJs2(_UsersZhangyueMyProjectHtml5jsReactquanzhan3Node_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	};
}

var propTypes = {
	name: _react2.PropTypes.string.isRequired,
	age: _react2.PropTypes.number.isRequired
};

var Profile = _wrapComponent('Profile')(function (_React$Component) {
	_inherits(Profile, _React$Component);

	function Profile(props) {
		_classCallCheck(this, Profile);

		var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

		_this.state = {
			liked: 0,
			hobbies: ['skateboarding', 'rock music']
		};
		_this.likedCallback = _this.likedCallback.bind(_this);
		_this.addHobbyCallback = _this.addHobbyCallback.bind(_this);
		return _this;
	}

	_createClass(Profile, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			setTimeout(function () {
				_this2.likedCallback();
			}, 1000);
		}
	}, {
		key: 'likedCallback',
		value: function likedCallback() {
			var liked = this.state.liked;
			liked++;
			this.setState({
				liked: liked
			});
		}
	}, {
		key: 'addHobbyCallback',
		value: function addHobbyCallback() {
			var hobbyInput = this.refs.hobby;
			var val = hobbyInput.value;
			if (val) {
				var hobbies = this.state.hobbies;

				hobbies = [].concat(_toConsumableArray(hobbies), [val]);
				this.setState({
					hobbies: hobbies
				}, function () {
					hobbyInput.value = '';
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react3.default.createElement(
				'div',
				{ className: 'profile-component' },
				_react3.default.createElement(
					'h1',
					null,
					'\u6211\u7684\u540D\u5B57\u4E2D',
					this.props.name
				),
				_react3.default.createElement(
					'h2',
					null,
					'\u6211\u4ECA\u5E74',
					this.props.age,
					'\u5C81'
				),
				_react3.default.createElement(
					'button',
					{ onClick: this.likedCallback },
					'\u7ED9\u6211\u70B9\u8D5E'
				),
				_react3.default.createElement(
					'h2',
					null,
					'\u603B\u70B9\u8D5E\u6570\uFF1A',
					this.state.liked
				),
				_react3.default.createElement(
					'ul',
					null,
					this.state.hobbies.map(function (hobby, i) {
						return _react3.default.createElement(_Hobby2.default, { key: i, hobby: hobby });
					})
				),
				_react3.default.createElement('input', { type: 'text', ref: 'hobby' }),
				_react3.default.createElement(
					'button',
					{ onClick: this.addHobbyCallback },
					'\u6DFB\u52A0\u7231\u597D'
				)
			);
		}
	}]);

	return Profile;
}(_react3.default.Component));

Profile.propTypes = propTypes;

exports.default = Profile;

//# sourceMappingURL=Profile.js.map