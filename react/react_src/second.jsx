import React from "react"
import ReactDOM from 'react-dom/client';
import { useRef, useState } from 'react';


class SecondPage extends React.Component {

	constructor(props) {
		super(props);
		this.highlighttext = this.highlighttext.bind(this);
		this.state = {
			p1state: {
				color: 'blue'
			},
			p2state: {
				color: 'blue'
			}
		};
	}

	highlighttext(event) {
		console.log("Hello, I pushed a button " + event.target.id);
		const pstyle = event.target.id + "text";
		console.log(pstyle);
		if (pstyle === "button1text")
		{
			this.setState(prevState => ({
				p1state:{
					...prevState.p1state,
					color: 'red'
				}
			}));
		} 
		else if (pstyle === "button2text")
		{
			console.log("Here");
			this.setState(prevState => ({
				p2state: {
					...prevState.p2state,
					color: 'purple'
				}
			}));
		}


	}


	render() {

	   const { color: pcolor } = this.state.p1state;
	   const { color: pcolor2 } = this.state.p2state;	
	   return (
		<>
			<h1>This is my second component</h1>
		   	<div>
			<button style={{display:"inline-block", verticalAlign:"middle"}} onClick={this.highlighttext} id="button1">Button 1</button>
		   	<p style={{ color: pcolor, display:"inline-block", verticalAlign:"middle"}} id="button1text">Button 1 Text</p>
			</div>
		   	<div>
		   	<button style={{display:"inline-block", verticalAlign:"middle"}} onClick={this.highlighttext} id="button2">Button 2</button>
			<p style={{ color: pcolor2, display:"inline-block", verticalAlign:"middle"}} id="button2text">Button 2 Text</p>
			</div>
		</>
	   );
	}
}

const container = document.getElementById('secondhome');
const root = ReactDOM.createRoot(container);
root.render(<SecondPage />);


