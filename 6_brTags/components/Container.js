import React from "react";
import PropTypes from "prop-types";

import BR2JSX from "./BR2JSX";

class Container extends React.Component {
	static propTypes = {
		text: PropTypes.string.isRequired,
	};
  
	render() {
		return <BR2JSX text = { this.props.text }/>;
	}
}

export default Container;
