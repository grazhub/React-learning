import React from "react";
import ReactDOM  from "react-dom";

import ComponentFrames from "./components/ComponentFrames";

const colors = ["red", "orange", "yellow", "green", "#00BFFF", "blue", "purple"];
const innerText = "Hello!";

ReactDOM.render(
	<ComponentFrames colors = { colors }>
		{ innerText }
	</ComponentFrames>,
	document.getElementById('container') 
);
