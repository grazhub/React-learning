import React from 'react';
import PropTypes from 'prop-types';
import { clientEvents } from './events';

import MobileClient from './MobileClient';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {
	static propTypes = {
		name: PropTypes.string.isRequired,
		clients: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				fam: PropTypes.string.isRequired,
				im: PropTypes.string.isRequired,
				otch: PropTypes.string.isRequired,
				balance: PropTypes.number.isRequired,
			})
		),
	};

	state = {
		name: this.props.name,
		clients: this.props.clients,
		filter: "",
	};

	componentDidMount = () => {
		clientEvents.addListener('removeClient', this.removeClient);
		clientEvents.addListener('afterEditEnd', this.endEditing);
	};
	
	componentWillUnmount = () => {
		clientEvents.removeListener('removeClient', this.removeClient);
		clientEvents.removeListener('afterEditEnd', this.endEditing);
	};

	removeClient = id => {
		const newClients = this.state.clients.slice();
		const clientInd = newClients.findIndex(item => item.id === id);
		newClients.splice(clientInd, 1);
		this.setState({ clients: newClients });
	};

	endEditing = client => {
		const newClients = this.state.clients.slice();
		let ind;
		const oldClient = newClients.find((item, index) => {
			if (item.id === client.id) {
				ind = index;
				return true;
			};
		});
		const newClient = {
			...oldClient,
			...client
		}
		newClients.splice(ind, 1, newClient);
		this.setState({ clients: newClients });
	};

	addEmptyClient = () => {
		this.setState({ clients: this.state.clients.concat({ id: +(new Date()), fam: "", im: "", otch: "", balance: 0, mode: "edit" }) });
	};

	setName1 = () => {
		this.setState({ name:'МТС' });
	};

	setName2 = () => {
		this.setState({name:'Velcom'});
	};

	resetFilter = () => {
		this.setState({ filter: "" });
	};
	setActiveFilter = () => {
		this.setState({ filter: "active" });
	};
	setBlockedFilter = () => {
		this.setState({ filter: "blocked" });
	};

	getClients = () => {
		const clients = this.state.clients.slice();
		let renderClients = clients;
		if (this.state.filter === "active") {
			renderClients = clients.filter(item => item.balance >= 0);
		} else if (this.state.filter === "blocked") {
			renderClients = clients.filter(item => item.balance < 0);
		}
		return renderClients.map( client => {
			return <MobileClient key = { client.id } info = { client } />;
		});
	};

	render() {
		console.log("MobileCompany render");

		return (
		<div className='MobileCompany'>
			<div className = "MobileCompanyNameBlok">
				<input type="button" value="=МТС" onClick={ this.setName1 } />
				<input type="button" value="=Velcom" onClick={ this.setName2 } />
				<div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
			</div>

			<div className = "MobileCompanyNameBlok">
				<input type="button" value="Все" onClick = { this.resetFilter } />
				<input type="button" value="Активные" onClick = { this.setActiveFilter } />
				<input type="button" value="Заблокированные" onClick = { this.setBlockedFilter } />
			</div>

			<table className = "MobileCompanyTable">
				<tbody>
					<tr className = "MobileCompanyTableHeader">
						<th>Фамилия</th>
						<th>Имя</th>
						<th>Отчество</th>
						<th>Баланс</th>
						<th>Статус</th>
						<th>Редактировать</th>
						<th>Удалить</th>
					</tr>
					{ this.getClients() }
				</tbody>
			</table>
			<input type="button" value="Добавить клиента" onClick={ this.addEmptyClient } />
		</div>
		);
	}

}

export default MobileCompany;
