import React, { Component } from 'react';
import './header.css';

import { Avatar, Tooltip } from 'antd';

class Header extends Component {
	render() {
		return (
			<div id="header">
				<div id="nav">
					<img id="logo" src="/static/favicon.ico" alt="logo" />
					<div id="title">Transcript</div>
					<div id="btn">
						<Tooltip title="AkiJoey">
							<a href="https://akijoey.com"><Avatar size="large" src="/static/avatar.png" /></a>
						</Tooltip>
					</div>
				</div>
			</div>
		)
	}
}

export default Header;