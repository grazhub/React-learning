import React from "react";
import PropTypes from "prop-types";

// import "./DoubleButton.css";

class DoubleButton extends React.Component {
	static propTypes = {
		caption1: PropTypes.string.isRequired,
		caption2: PropTypes.string.isRequired,
		cbPressed: PropTypes.func.isRequired,
	};

	pressedBtn = numButton => {
		this.props.cbPressed(numButton);
	};

	render() {
		return (
			<div className = "doubleButton">
				<input type = "button" value = { this.props.caption1 } onClick = { this.pressedBtn.bind(this, 1) }/>
				{ this.props.children }
				<input type = "button" value = { this.props.caption2 } onClick = { this.pressedBtn.bind(this, 2) }/>
			</div>
		);
	}
}

export default DoubleButton;