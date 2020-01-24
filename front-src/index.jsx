import React, { Fragment, Component } from 'react';
import ReactDom from 'react-dom';

import {
	BrowserRouter as Router,
  	Switch,
  	Route,
  	Link,
  	Redirect,
} from "react-router-dom";

import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

/* Deny text selection on component */
const noselect = {
	WebkitTouchCallout: 'none', /* iOS Safari */
	WebkitUserSelect: 'none', /* Safari */
	KhtmlUserSelect: 'none', /* Konqueror HTML */
	MozUserSelect: 'none', /* Old versions of Firefox */
	MsUserSelect: 'none', /* Internet Explorer/Edge */
	UserSelect: 'none', /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
};

/* Application theme */
const theme = createMuiTheme({
	palette: {
	    primary: {
	    	main: '#2196f3'
	    },
	    secondary: {
	    	main: '#2979ff'
	    },
  	},
});

/* Application Components */
import './styles/index';
import Home from './components/home';

class App extends Component {

	componentDidMount() {
		document.title = "Infordata - Backup Sync";
	}

	render() {
		return (
			<div style={{ ...noselect }}>
				<ThemeProvider theme={ theme } >
					<Switch>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</ThemeProvider>
			</div>
		);
	}
}

ReactDom.render(
	<Router basename="/">
		<App />
	</Router>,
	document.getElementById('app')
);