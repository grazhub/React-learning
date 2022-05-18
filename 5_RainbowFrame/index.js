import React from "react";
import ReactDOM  from "react-dom";

import RainbowFrame from "./components/RainbowFrame";

const colors = ["red", "orange", "yellow", "green", "#00BFFF", "blue", "purple"];
const innerText = "Hello!";

ReactDOM.render(
	<RainbowFrame colors = { colors }>
		{ innerText }
	</RainbowFrame>,
	document.getElementById('container') 
);
