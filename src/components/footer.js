import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
	render() {
		return (
			<div id="footer">
				<div id="copyright">©2019 By <a href="https://akijoey.com">AkiJoey</a></div>
				<div id="framework">Driven <a href="https://djangoproject.com">Django</a> + <a href="https://reactjs.org">React</a></div>
			</div>
		)
	}
}

export default Footer;