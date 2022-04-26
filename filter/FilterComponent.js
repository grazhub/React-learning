const FilterComponent = React.createClass({
	displayName: "FilterComponent",
  
	propTypes: {
		initStrings: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				code: React.PropTypes.number.isRequired,
				value: React.PropTypes.string.isRequired,
			})
		),
	},

	getInitialState: function () {
		return {
		  	isSorting: false,
			filterValue: "",
		};
	},

	setSettings: function (EO) {
		switch (EO.target.type) {
			case "checkbox":
				this.setState({ isSorting: !this.state.isSorting });
				break;
			case "button":
				this.setState({ isSorting: false, filterValue: "" });
				break;
			case "text":
			default:
				this.setState({ filterValue: EO.target.value });
				break;
		}
	},

	getStrings: function () {
		const str = [...this.props.initStrings];
		if (this.state.isSorting) {
			str.sort((a, b) => {
				if (a.value === b.value) return 0;
				return a.value > b.value ? 1 : -1;
			});
		}
		return this.state.filterValue ? str.filter(s => s.value.includes(this.state.filterValue)) : str;
	},
  
	render: function () {
		const stringsBox = this.getStrings().map(str =>
			React.DOM.div({ key: str.code }, React.DOM.span(null, str.value))
		);

		return React.DOM.div({ className: "filterComponent" }, 
			React.DOM.div({ className: "filterComponent__controls" },
				React.DOM.input({ type: "checkbox", checked: this.state.isSorting, onChange: this.setSettings }),
				React.DOM.input({ value: this.state.filterValue, onChange: this.setSettings }),
				React.DOM.input({ type: "button", value: "reset", onClick: this.setSettings }),
			),
			React.DOM.div({ className: "filterComponent__result" }, stringsBox),
		);
	},
  
});