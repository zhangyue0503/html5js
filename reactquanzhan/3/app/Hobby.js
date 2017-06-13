'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
// const propTypes = {
// 	hobby:PropTypes.string.isRequired
// };
//
// class Hobby extends React.Component{
// 	render(){
// 		return <li>{this.props.hobby}</li>
// 	}
// }
// Hobby.propTypes = propTypes;
// export default Hobby;

//无状态组件
function Hobby(props) {
	return _react2.default.createElement(
		'li',
		null,
		props.hobby
	);
}
exports.default = Hobby;

//# sourceMappingURL=Hobby.js.map