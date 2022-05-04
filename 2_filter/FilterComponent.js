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
			filteredStrings: this.props.initStrings,
		};
	},

	changeSorting: function (EO) {
		this.setState({ isSorting: EO.target.checked }, this.getStrings);
	},

	changeFilter: function (EO) {
		this.setState({ filterValue: EO.target.value }, this.getStrings);
	},

	reset: function () {
		this.setState({ isSorting: false, filterValue: "" }, this.getStrings);
	},

	getStrings: function () {
		const str = [...this.props.initStrings];
		if (this.state.isSorting) {
			str.sort((a, b) => {
				if (a.value === b.value) return 0;
				return a.value > b.value ? 1 : -1;
			});
		}
		this.setState({ filteredStrings: this.state.filterValue ? str.filter(s => s.value.includes(this.state.filterValue)) : str });
	},
  
	render: function () {
		const stringsBox = this.state.filteredStrings.map(str =>
			React.DOM.div({ key: str.code }, React.DOM.span(null, str.value))
		);

		return React.DOM.div({ className: "filterComponent" }, 
			React.DOM.div({ className: "filterComponent__controls" },
				React.DOM.input({ type: "checkbox", checked: this.state.isSorting, onChange: this.changeSorting }),
				React.DOM.input({ value: this.state.filterValue, onChange: this.changeFilter }),
				React.DOM.input({ type: "button", value: "reset", onClick: this.reset }),
			),
			React.DOM.div({ className: "filterComponent__result" }, stringsBox),
		);
	},
  
});