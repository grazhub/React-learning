import React from "react";
import PropTypes, { string } from "prop-types";

import "./CardComponent.css";

class CardComponent extends React.Component{
	static propTypes = {
		mode: PropTypes.oneOf(["readonly", "edit"]),
		code: PropTypes.number,
		name: PropTypes.string,
		price: PropTypes.number,
		count: PropTypes.number,
		photo: PropTypes.string,
		isValid: PropTypes.bool.isRequired,
		isNew: PropTypes.bool.isRequired,
		cbSaveChanges: PropTypes.func.isRequired,
		cbStartEditing: PropTypes.func.isRequired,
	};

	state = {
		mode: this.props.mode,
		code: this.props.code,
		name: this.props.name,
		price: this.props.price,
		count: this.props.count,
		photo: this.props.photo,
		isValid: this.props.isValid,
		isNew: this.props.isNew,
		startEdit: false,
	};

	errorStrings = {
		name: "Please, fill the field. Value must be a string",
		price: "Please, fill the field. Value must be a rational number greater than 0",
		photo: "Please, fill the field. Value must be a valid URL",
		count: "Please, fill the field. Value must be a positive integer",
	};

	saveChanges = () => {
		this.props.cbSaveChanges({ ...this.state, startEdit: false });
	};

	componentDidUpdate() {
		(this.props.code !== this.state.code || this.props.mode !== this.state.mode) && this.setState({...this.props, startEdit: false});
	};

	changeField = (field, EO) => {
		if (!this.state.startEdit) this.props.cbStartEditing();
		this.setState({ [field]: field === "count" || field === "price" ? Number(EO.target.value) : EO.target.value, startEdit: true }, this.validateAllFields);
	};

	validateAllFields = () => {
		let isValid = true;
		const fields = ["name", "price", "photo", "count"];
		for ( let fieldName of fields ) {
			if (!this.validateField(fieldName)) {
				isValid = false;
			}
		}
		this.setState({ isValid: isValid });
	};

	validateField = (fieldName) => {
		let isValid = true;
		switch (fieldName) {
			case "name":
				isValid = !(!this.state[fieldName] || typeof this.state[fieldName] !== "string");
				break;
			case "price":
				isValid = !(!this.state[fieldName] || isNaN(this.state[fieldName]) || this.state[fieldName] <= 0);
				break;
			case "photo":
				isValid = !(!this.isValidURL(this.state[fieldName]));
				break;
			case "count":
				isValid = !(!this.state[fieldName] || isNaN(this.state[fieldName]) || this.state[fieldName] % 1 > 0)		
				break;
		}
		return isValid;
	};

	isValidURL = (url) => {
		if (!url || typeof url !== "string") return false;
		const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		return (res !== null)
	};

	cancelChanges = () => {
		this.props.cbSaveChanges({ ...this.props, startEdit: false, mode: "readonly" });
	};

	render() {
		return (
			this.state.mode === "readonly"
			? <div className = "cardComponent">
				<h3>{ this.props.name }</h3>
				<p>{ this.props.name }</p>
				<p>{ `Price: ${this.props.price}$` }</p>
			  </div>
			: <div className = "cardComponent editmode">
				<h3>{ this.state.isNew ? "Add Product" : "Edit Product" }</h3>
				<p className = "cardComponent_field">{ `ID: ${this.state.code}` }</p>
				<div className = "cardComponent_field">
					<label className = "cardComponent_field_label">Name</label>
					<input type = "text" value = { this.state.name || "" } onChange = { this.changeField.bind(this, "name") }/>
					<p className = "cardComponent_field_error">{!this.validateField("name") && this.errorStrings["name"]}</p>
				</div>
				<div className = "cardComponent_field">
					<label className = "cardComponent_field_label">Price</label>
					<input type = "number" value = { this.state.price || "" } onChange = { this.changeField.bind(this, "price") }/>
					<p className = "cardComponent_field_error">{!this.validateField("price") && this.errorStrings["price"]}</p>
				</div>
				<div className = "cardComponent_field">
					<label className = "cardComponent_field_label">URL</label>
					<input type = "text" value = { this.state.photo || "" } onChange = { this.changeField.bind(this, "photo") }/>
					<p className = "cardComponent_field_error">{!this.validateField("photo") && this.errorStrings["photo"]}</p>
				</div>
				<div className = "cardComponent_field">
					<label className = "cardComponent_field_label">Quantity</label>
					<input type = "number" value = { this.state.count || "" } onChange = { this.changeField.bind(this, "count") }/>
					<p className = "cardComponent_field_error">{!this.validateField("count") && this.errorStrings["count"]}</p>
				</div>
				<button disabled = { !this.state.isValid && "disabled" } onClick = { this.saveChanges }>Save</button>
				<button onClick = { this.cancelChanges }>Cancel</button>
			</div>
		);
	};
};

export default CardComponent;
