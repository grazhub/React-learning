import React from "react";
import PropTypes from "prop-types";

import './IshopComponent3.css';
import ProductComponent from './ProductComponent';
import CardComponent from './CardComponent';

class IshopComponent3 extends React.Component{
	static propTypes = {
		shopName: PropTypes.string,
		products: PropTypes.arrayOf(
			PropTypes.shape({
				code: PropTypes.number.isRequired,
				name: PropTypes.string.isRequired,
				price: PropTypes.number.isRequired,
				count: PropTypes.number.isRequired,
				photo: PropTypes.string.isRequired,
			})
		),
	};

	state = { 
		activeProduct: null,
		products: this.props.products,
		cardMode: "readonly",
		startEdit: false,
	};

	changeProductStatus = (status, productProps) => {
		if (status === "update") {
			this.setState({ activeProduct: productProps.code, cardMode: productProps.mode, startEdit: productProps.startEdit });
		} else if (status === "delete") {
			const index = this.state.products.findIndex(item => item.code === productProps.code)
			const updatedProds = this.state.products;
			updatedProds.splice(index, 1);
			this.setState({ products: updatedProds, activeProduct: this.state.activeProduct === productProps.code ? null : this.state.activeProduct })
		}
	};

	startEditing = () => {
		this.setState({ startEdit: true });
	};

	updateProduct = (newProd) => {
		let newProducts;
		if (!this.state.activeProduct && !this.state.products.find(i => i.code === newProd.code)) {
			if (newProd.mode === "readonly") {
				this.setState({ cardMode: newProd.mode, startEdit: false })
				return;
			}
			newProducts = this.state.products.concat();
			newProducts.push(newProd);
		} else {
			newProducts = this.state.products.concat().map(item => item.code === newProd.code ? newProd : item);
		};
		this.setState({ products: newProducts, cardMode: "readonly", startEdit: newProd.startEdit, activeProduct: newProd.code })
	};

	addEmptyCard = () => {
		this.setState({ activeProduct: null, cardMode: "edit", startEdit: true });
	};
  
	render() {
		const productsCode = this.state.products.map( product =>
			<ProductComponent 
				key = { product.code }
				code = { product.code }
				photo = { product.photo }
				name = { product.name }
				count = { product.count }
				price = { product.price }
				selectedCode = { this.state.activeProduct }
				activeBtns = { !this.state.startEdit }
				cbSetStatus = { this.changeProductStatus }
			/>
		);
		const activeProduct = this.state.activeProduct ? this.state.products.find(item => item.code === this.state.activeProduct) : null;
		return (
			<div className = "ishopComponent">
				<div className = "ishopComponent__name">{ `Welcome to the ${this.props.shopName}, buddy` }</div>
				<div className = "ishopComponent__wrap">
					<div className = "ishopComponent__products">{ productsCode }</div>
					{
						this.state.activeProduct || this.state.cardMode === "edit"
						? <CardComponent
							mode = { this.state.cardMode }
							code = { activeProduct && activeProduct.code || this.state.products.at(-1).code + 1 }
							photo = { activeProduct && activeProduct.photo }
							name = { activeProduct && activeProduct.name }
							count = { activeProduct && activeProduct.count }
							price = { activeProduct && activeProduct.price }
							isValid = { !!this.state.activeProduct }
							isNew = { !this.state.activeProduct }
							cbSaveChanges = { this.updateProduct }
							cbStartEditing = { this.startEditing }
						  />
						: <div className = "ishopComponent__card"></div>
					}
				</div>
				<button disabled = { this.state.startEdit && "disabled" } onClick = { this.addEmptyCard }>New product</button>
				
			</div>
		)
	};
};

export default IshopComponent3;
