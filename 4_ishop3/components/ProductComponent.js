const React = require('react');

require('./ProductComponent.css');

const ProductComponent = React.createClass({
	displayName: 'ProductComponent',
  
	propTypes: {
		code: React.PropTypes.number.isRequired,
		name: React.PropTypes.string.isRequired,
		price: React.PropTypes.number.isRequired,
		count: React.PropTypes.number.isRequired,
		photo: React.PropTypes.string.isRequired,
		selectedCode: React.PropTypes.number,
		cbSetStatus: React.PropTypes.func.isRequired,
	},

	setActive: function () {
		this.props.cbSetStatus("update", this.props.code);
	},

	deleteProduct: function (EO) {
		EO.stopPropagation();
		const isDeleted = confirm(`Do you really want delete the ${this.props.name}?`)
		isDeleted && this.props.cbSetStatus("delete", this.props.code);
	},
  
	render: function () {
		return React.DOM.tr({ className: `product ${this.props.selectedCode === this.props.code ? "selected" : ""}`, onClick: this.setActive },
			React.DOM.td({ className: "product__photo" },
				React.DOM.img({ src: this.props.photo }),
			),
			React.DOM.td({ className: "product__info" },
				React.DOM.p({ className: "product__info_name" }, this.props.name),
			),
			React.DOM.td({ className: "product__info" },
				React.DOM.p({ className: "product__info_count" }, `Осталось ${this.props.count} шт.`),
			),
			React.DOM.td({ className: "product__info" },
				React.DOM.div({ className: "product__info_price" }, `${this.props.price.toFixed(2)} $`),
			),
			React.DOM.td({ className: "product__info" },
				React.DOM.button({ className: "product__cart", onClick: this.deleteProduct },
					React.DOM.span({ className: "material-icons-outlined" }, "delete_forever"),
				),
			),
			
		);
	},
  
});

module.exports = ProductComponent;
