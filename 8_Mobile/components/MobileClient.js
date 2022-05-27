import React from 'react';
import PropTypes from 'prop-types';
import { clientEvents } from './events';

import './MobileClient.css';

class MobileClient extends React.PureComponent {
	static propTypes = {
		info: PropTypes.shape({
			id: PropTypes.number.isRequired,
			fam: PropTypes.string.isRequired,
			im: PropTypes.string.isRequired,
			otch: PropTypes.string.isRequired,
			balance: PropTypes.number.isRequired,
		}),
	};

	constructor(props) {
		super(props);

		this.newFamRef = React.createRef();
		this.newImRef = React.createRef();
		this.newOtchRef = React.createRef();
		this.newBalanceRef = React.createRef();
	}  

	state = {
		fam: this.props.info.fam,
		im: this.props.info.im,
		otch: this.props.info.otch,
		balance: this.props.info.balance,
		mode: this.props.info.mode || "readonly",
		status: this.props.info.balance >= 0 ? "active" : "blocked",
	};

	editClient = () => {
		if(this.state.mode === "edit") {
			const newBalance = this.newBalanceRef.current && Number(this.newBalanceRef.current.value) || Number(this.state.balance);
			const newProps = {
				mode: "readonly",
				fam: this.newFamRef.current && this.newFamRef.current.value || this.state.fam,
				im: this.newImRef.current && this.newImRef.current.value || this.state.im,
				otch: this.newOtchRef.current && this.newOtchRef.current.value || this.state.otch,
				balance: newBalance,
				status: newBalance < 0 ? "blocked" : "active",
			}
			this.setState(newProps);
			clientEvents.emit("afterEditEnd", { id: this.props.info.id, fam: newProps.fam, im: newProps.im, otch: newProps.otch, balance: newProps.balance });
		} else {
			this.setState({ mode: "edit" });
			clientEvents.emit("afterEditStart", this.props.info.id);
		}
	};
	cancelEditor = () => this.setState({ mode: "readonly" });

	removeClient = () => {
		clientEvents.emit("removeClient", this.props.info.id);
	}

	render() {
		console.log("MobileClient id="+this.props.info.id+" render");
		
		return (
		<tr className='MobileClient'>
				<td>{ this.state.mode === "edit" ? <input defaultValue = { this.state.fam } ref = { this.newFamRef }/> : this.state.fam }</td>
				<td>{ this.state.mode === "edit" ? <input defaultValue = { this.state.im } ref = { this.newImRef }/> : this.state.im }</td>
				<td>{ this.state.mode === "edit" ? <input defaultValue = { this.state.otch } ref = { this.newOtchRef }/> : this.state.otch }</td>
				<td>{ this.state.mode === "edit" ? <input defaultValue = { this.state.balance } ref = { this.newBalanceRef }/> : this.state.balance }</td>
				<td>{ this.state.status }</td>
				<td>
					<button onClick = { this.editClient }>{ this.state.mode === "edit" ? "Сохранить" : "Редактировать" }</button>
					{ this.state.mode === "edit" ? <button onClick = { this.cancelEditor }>Отменить</button> : null }
				</td>
				<td>
					<button onClick = { this.removeClient }>Удалить</button>
				</td>
		</tr>
		);
	}

}

export default MobileClient;
