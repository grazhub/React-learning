import React from "react";
import PropTypes from "prop-types";

import "./ProductComponent.css";

class ProductComponent extends React.Component{
	static propTypes = {
		code: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		count: PropTypes.number.isRequired,
		photo: PropTypes.string.isRequired,
		activeBtns: PropTypes.bool.isRequired,
		selectedCode: PropTypes.number,
		cbSetStatus: PropTypes.func.isRequired,
	};

	setActive = () => {
		if (!this.props.activeBtns) return;
		this.props.cbSetStatus("update", { code: this.props.code, mode: "readonly", startEdit: false });
	};

	editProduct = (EO) => {
		EO.stopPropagation();
		this.props.cbSetStatus("update", { code: this.props.code, mode: "edit" });
	};

	deleteProduct = (EO) => {
		EO.stopPropagation();
		const isDeleted = confirm(`Do you really want delete the ${this.props.name}?`)
		isDeleted && this.props.cbSetStatus("delete", { code: this.props.code });
	};
  
	render() {
		return (
			<div className = { `product ${this.props.selectedCode === this.props.code ? "selected" : ""}` } onClick = { this.setActive }>
				<div className = "product__photo">
					<img src = { this.props.photo }/>
				</div>
				<div className = "product__info">
					<p className = "product__info_name">{ this.props.name }</p>
					<p className = "product__info_count">{ `Осталось ${this.props.count} шт.` }</p>
					<div className = "product__info_price">{ `${this.props.price.toFixed(2)} $` }</div>
				</div>
				<div className = "product__controls">
					<button className = "product_cart" disabled = { !this.props.activeBtns && "disabled" } onClick = { this.editProduct }>
						<span className = "material-icons-outlined">edit</span>
					</button>
					<button className = "product_cart" disabled = { !this.props.activeBtns && "disabled" } onClick = { this.deleteProduct }>
						<span className = "material-icons-outlined">delete_forever</span>
					</button>
				</div>
				
			</div>
		);
	};
};

export default ProductComponent;
