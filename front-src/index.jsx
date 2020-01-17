import React, { Fragment, Component } from 'react';
import ReactDom from 'react-dom';


class App extends Compenent {


	render() {
		return (
			<Fragment>
				<h1>Hello 0</h1>
			</Fragment>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));