const IshopComponent = React.createClass({
	displayName: 'IshopComponent',
  
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
  
	render: function () {
		const productsCode = this.props.products?.map( product =>
			React.DOM.div({ key: product.code, className: "product" },
				React.DOM.div({ className: "product__photo", src: product.photo },
					React.DOM.img({ src: product.photo }),
				),
				React.DOM.div({ className: "product__info" },
					React.DOM.p({ className: "product__info_name" }, product.name),
					React.DOM.p({ className: "product__info_count" }, `Осталось ${product.count} шт.`),
					React.DOM.div({ className: "product__info_price" }, `${product.price.toFixed(2)} $`),
				),
				React.DOM.button({ className: "product__cart" },
					React.DOM.span({ className: "material-icons-outlined" }, "shopping_cart"),
				),
			)
		);
		return React.DOM.div({ className: "ishopComponent" }, 
			React.DOM.div({ className: "ishopComponent__name" }, `Welcome to the ${this.props.shopName}, body`),
			React.DOM.div({ className: "ishopComponent__products" }, productsCode),
		);
	},
  
});