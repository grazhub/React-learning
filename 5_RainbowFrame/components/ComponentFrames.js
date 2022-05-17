import React from "react";
import PropTypes from "prop-types";

import RainbowFrame from "./RainbowFrame";

class ComponentFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  
  render() {
    return (
		<RainbowFrame colors = { this.props.colors }>
		 	{ this.props.children }
		</RainbowFrame>
    );
  }
}

export default ComponentFrame;
