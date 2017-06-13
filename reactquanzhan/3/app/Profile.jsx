import React,{PropTypes} from 'react'
import Hobby from './Hobby';

const propTypes = {
	name:PropTypes.string.isRequired,
	age:PropTypes.number.isRequired
};

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			liked:0,
			hobbies:['skateboarding','rock music']
		};
		this.likedCallback = this.likedCallback.bind(this);
		this.addHobbyCallback = this.addHobbyCallback.bind(this);
	}

	componentDidMount(){
		setTimeout(()=>{this.likedCallback();},1000);
	}

	likedCallback(){
		let liked = this.state.liked;
		liked++;
		this.setState({
			liked
		});
	}
	addHobbyCallback(){
		let hobbyInput = this.refs.hobby;
		let val = hobbyInput.value;
		if(val){
			let hobbies = this.state.hobbies;

			hobbies = [...hobbies,val];
			this.setState({
				hobbies
			},()=>{hobbyInput.value='';
			});
		}
	}
	render(){
		return (
			<div className="profile-component">
			{/*this.props就是传入的属性*/}
				<h1>我的名字中{this.props.name}</h1>
				<h2>我今年{this.props.age}岁</h2>
				<button onClick={this.likedCallback}>给我点赞</button>
				<h2>总点赞数：{this.state.liked}</h2>
				<ul>
					{this.state.hobbies.map((hobby,i)=><Hobby key={i} hobby={hobby}/>)}
				</ul>
				<input type="text" ref="hobby"/>
				<button onClick={this.addHobbyCallback}>添加爱好</button>
			</div>
		)
	}
}

Profile.propTypes = propTypes;

export default Profile;