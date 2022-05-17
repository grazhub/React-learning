import React from "react";
import PropTypes from "prop-types";

import "./BR2JSX.css";

class BR2JSX extends React.Component {
	static propTypes = {
		text: PropTypes.string.isRequired,
	};
  
	render() {
		let tagregexp = /<[^<>]+>/g;
		return (
			<div className = "br2jsx">
				{ this.props.text.split(tagregexp).reduce((jsxElems, string, index) => {
					jsxElems.push(string, <br key = { index }/>)
					return jsxElems;
				}, []) }
			</div>
		);
	}
}

export default BR2JSX;