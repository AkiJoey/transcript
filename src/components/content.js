import React, { Component } from 'react';
import './content.css';

import { message, Icon, Button, Input, Table } from 'antd';
import axios from 'axios';

class Content extends Component {
	state = {
		columns: [
			{
				title: 'Name',
				dataIndex: 'name',
				className: 'column-left',
			},
			{
				title: 'Type',
				dataIndex: 'type',
				className: 'column-center'
			},
			{
				title: 'Credit',
				dataIndex: 'credit',
				className: 'column-center'
			},
			{
				title: 'Grade',
				dataIndex: 'grade',
				className: 'column-center'
			},
			{
				title: 'GPA',
				dataIndex: 'gpa',
				className: 'column-center'
			}
		],
		username: '',
		password: '',
		year: '',
		term: '',
		data: []
	}
	handleChange = e => {
		if (e.target.placeholder === 'Username')
			this.setState({
				username: e.target.value
			});
		else if (e.target.placeholder === 'Password')
			this.setState({
				password: e.target.value
			});
		else if (e.target.placeholder === 'Year')
			this.setState({
				year: e.target.value
			});
		else if (e.target.placeholder === 'Term')
			this.setState({
				term: e.target.value
			});
	}
	handleClick = () => {
		axios.post('http://localhost:8000/search', {
			username: this.state.username,
			password: this.state.password,
			year: this.state.year,
			term: this.state.term
		})
		.then(response => {
			this.setState({
				data: response.data
			});
			message.success('Search success.');
			console.log(response);
		})
		.catch(error => {
			message.error('Search error.');
			console.log(error);
		});
	}
	tableHeader = () => {
		return (
			<div id="table-header">
				<Input placeholder="Username" onChange={this.handleChange} prefix={<Icon type="user" />} />
				<Input type="password" placeholder="Password" onChange={this.handleChange} prefix={<Icon type="lock" />} />
				<Input placeholder="Year" onChange={this.handleChange} prefix={<Icon type="calendar" />} />
				<Input placeholder="Term" onChange={this.handleChange} prefix={<Icon type="ordered-list" />} />
				<Button type="primary" onClick={this.handleClick} icon="search">Search</Button>
			</div>
		)
	}
	render() {
		return (
			<div id="content">
				<Table title={this.tableHeader} columns={this.state.columns} dataSource={this.state.data} pagination={false} />
			</div>
		)
	}
}

export default Content;