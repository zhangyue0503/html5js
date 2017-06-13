import React from 'react';
import {render} from 'react-dom';
import Profile from './Profile';


const ele = document.createElement('div');
document.body.appendChild(ele);
const props = {
	name:'viking',
	age:20
};

render(<Profile {...props} />,ele);

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