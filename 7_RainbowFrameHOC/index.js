import React from "react";
import ReactDOM  from "react-dom";

import DoubleButton from "./components/DoubleButton";
import withRainbowFrame from "./components/withRainbowFrame"

const colors = ["red", "orange", "yellow", "green", "#00BFFF", "blue", "purple"];
const captions1 = ["однажды", "в студеную зимнюю пору", "пору"];
const captions2 = ["я из лесу", "вышел, был сильный", "мороз"];

const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
	<DoubleButton caption1 = { captions1[0] } caption2 = { captions1[2] } cbPressed = { num => console.log(num) }>
		{ captions1[1] }
	</DoubleButton>,
	document.getElementById("container1") 
);

ReactDOM.render(
	<FramedDoubleButton caption1 = { captions2[0] } caption2 = { captions2[2] } cbPressed = { num => console.log(num) }>
		{ captions2[1] }
	</FramedDoubleButton>,
	document.getElementById("container2") 
);
