import React from 'react';

export default class Counter extends React.Component{
	constructor(){
		super();
		this.state = {value:0};
	}
j
	render() {
		return (
			<div>
				<button onClick={()=>this.setState({value:this.state.value+1})}>
					INCREMENT
				</button>
						Counter组件的内部状态
						<pre>{JSON.stringify(this.state,null,2)}</pre>
			</div>
		);
	}

};
