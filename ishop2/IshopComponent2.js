const IshopComponent2 = React.createClass({
	displayName: 'IshopComponent2',
  
	propTypes: {
		shopName: React.PropTypes.string,
		products: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				code: React.PropTypes.number.isRequired,
				name: React.PropTypes.string.isRequired,
				price: React.PropTypes.number.isRequired,
				count: React.PropTypes.number.isRequired,
				photo: React.PropTypes.string.isRequired,
			})
		),
	},

	getInitialState: function() {
		return { 
			activeProduct: null,
			products: this.props.products,
		};
	  },

	changeProductStatus: function (status, code) {
		if (status === "update") {
			this.setState({ activeProduct: code });
		} else if (status === "delete") {
			const index = this.state.products.findIndex(item => item.code === code)
			const updatedProds = this.state.products;
			updatedProds.splice(index, 1);
			this.setState({ products: updatedProds, activeProduct: this.state.activeProduct === code ? null : this.state.activeProduct })
		}
	},
  
	render: function () {
		const productsCode = this.state.products?.map( product =>
			React.createElement(ProductComponent, { 
				key: product.code,
				code: product.code,
				photo: product.photo,
				name: product.name,
				count: product.count,
				price: product.price,
				selectedCode: this.state.activeProduct,
				cbSetStatus: this.changeProductStatus
			}),
		);
		return React.DOM.div({ className: "ishopComponent" }, 
			React.DOM.div({ className: "ishopComponent__name" }, `Welcome to the ${this.props.shopName}, buddy`),
			React.DOM.table({ className: "ishopComponent__products" },
				React.DOM.tbody(null, productsCode)
			),
		);
	},
  
});
