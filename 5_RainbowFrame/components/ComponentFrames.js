import React from "react";
import PropTypes from "prop-types";

import RainbowFrame from "./RainbowFrame";

class ComponentFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
	innerText: PropTypes.string,
  };
  
  render() {
    return (
		<RainbowFrame colors = { this.props.colors }>
		 	{ this.props.innerText }
		</RainbowFrame>
    );
  }
}

export default ComponentFrame;
