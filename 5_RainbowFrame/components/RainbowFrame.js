import React from "react";
import PropTypes from "prop-types";

class RainbowFrame extends React.Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  getColorFrame = (content, color) => {
	return (
		<div style={{ border: `solid 7px ${color}`, padding: "10px" }}>
        	{content}
      	</div>
	)
  }
  
  render() {
	const startContent = <p style = {{ textAlign: "center" }}>
		{ this.props.children }
	</p>;
	return (
		this.props.colors.reduce((innerContent, color) => this.getColorFrame(innerContent, color), startContent)
	);
  }
}

export default RainbowFrame;