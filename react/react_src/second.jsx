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
			},
			buttonelementslayout: {
				display:'inline-block',
				verticalAlign:'middle'
			}
		};
	}

	highlighttext(event) {
		console.log("Hello, I pushed a button " + event.target.id);
		if (event.target.id === "button1")
		{
			var newColor = "blue"

			if (this.state.p1state.color === "blue") {
				newColor = "purple";	
			}

			this.setState(prevState => ({
				p1state: {
					...prevState.p1state,
					color: newColor
				}
			}));
		} 
		else if (event.target.id === "button2")
		{

			var newColor = "blue"

			if (this.state.p2state.color === "blue")
			{
				newColor = "red";
			}

			this.setState(prevState => ({
				p2state: {
					...prevState.p2state,
					color: newColor
				}
			}));
		}


	}


	render() {

	   const { color: pcolor } = this.state.p1state;
	   const { color: pcolor2 } = this.state.p2state;
	   const { display: displaysets, verticalAlign: align } = this.state.buttonelementslayout
	   return (
		<>
			<h1>This is my second component</h1>
		   	<div> 
			<button style={{display: displaysets, verticalAlign: align}} onClick={this.highlighttext} id="button1">Button 1</button>
		   	<p style={{ color: pcolor, display: displaysets, verticalAlign: align}} id="button1text">Button 1 Text</p>
			</div>
		   	<div>
		   	<button style={{display:displaysets, verticalAlign:align}} onClick={this.highlighttext} id="button2">Button 2</button>
			<p style={{ color: pcolor2, display: displaysets, verticalAlign: align}} id="button2text">Button 2 Text</p>
			</div>

		   	<div> 
		   		<form id ="basicForm" action="/first-form" method="post">
		   			<p>
		   				<label htmlFor="name">Name:</label>
		   				<input type="text" id="name" name="username"></input>
		   			</p>
		   			<p>
		   				<label htmlFor="mail">Email:</label>
		   				<input type="email" id="mail" name="user_email"></input>
		   			</p>
		   			<div>
		   				<button type="submit" form="basicForm">Submit your stuff</button>
		   			</div>
		   		</form>
		   	</div>
		</>
	   );
	}
}

const container = document.getElementById('renderpage');
const root = ReactDOM.createRoot(container);
root.render(<SecondPage />);


