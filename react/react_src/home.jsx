import React from "react"
import ReactDOM from 'react-dom/client';

class HomePage extends React.Component {
	render() {
	   return (
		<>
			<h1>This is a react component</h1>
		   	<p> This is a concatneated component</p>
		   	<img src="/images/mike.png"></img>
		</>
	   );
	}
}

const container = document.getElementById('renderpage');
const root = ReactDOM.createRoot(container);
root.render(<HomePage />);


