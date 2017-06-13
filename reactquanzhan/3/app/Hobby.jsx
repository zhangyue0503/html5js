import React,{PropTypes} from 'react';
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
function Hobby(props){
	return <li>{props.hobby}</li>
}
export default Hobby;
