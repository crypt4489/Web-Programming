import React from "react"
import ReactDOM from 'react-dom/client';
import {useState, useEffect} from 'react';


function ServerComponent() {
	const [content, setContent] = useState('');
	console.log("Hello");
	useEffect(() => {
		fetch("http://10.0.0.94:8080/host-details")
			.then(data => data.json())
			.then((json) => {
				setContent(json);
				console.log(json);
		});
	}, []);

	console.log(content.system);
	console.log(content.version);
	console.log(content.node);

	return (
		<div>
			<h1>{content.system}</h1>
			<h1>{content.version}</h1>
			<h1>{content.node}</h1>
		</div>
	);

}

const container = document.getElementById('renderpage');
const root = ReactDOM.createRoot(container);
root.render(<ServerComponent />);


