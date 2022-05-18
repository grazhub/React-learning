import React from "react";

const getColorFrame = (content, color) =>
	(
		<div style={{ border: `solid 7px ${color}`, padding: "10px" }}>
        	{content}
      	</div>
	);

const withRainbowFrame = colors => Comp => props =>
	colors.reduce((innerContent, color) => getColorFrame(innerContent, color), <Comp {...props} />);

export default withRainbowFrame;
