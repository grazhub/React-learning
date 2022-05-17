import React from "react";
import ReactDOM  from "react-dom";

import Container from "./components/Container";

const text = "первый<br/>второй<br/>третий<br/>последний";

ReactDOM.render(
	<Container text = { text }/>,
	document.getElementById('container') 
);
