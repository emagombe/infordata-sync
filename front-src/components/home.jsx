import React, { Fragment, Component } from 'react';
import ReactDom from 'react-dom';

const remote = window.require('electron').remote;
const ipcRenderer = window.require('electron').ipcRenderer;

import {
  	Link as R_Link,
  	Redirect,
  	withRouter,
} from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';

/* Material components */
import {
	AppBar,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	Hidden,
	IconButton,
	LinearProgress,
	Link,
	Paper,
	Snackbar,
	SvgIcon,
	TextField,
	Toolbar,
	Typography,
} from '@material-ui/core';

/* Icons */
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import CropSquareIcon from '@material-ui/icons/CropSquare';

const nodrag = {
	WebkitAppRegion: 'no-drag',
};

const styles = theme => ({
	root: {

	},
	primarybar: {
		WebkitAppRegion: "drag",
	},
	apptitle: {
		margin: 5,
	}
});

class Home extends Component {

	state = {
		uploading: 'upload',
	};

	componentDidMount() {
		ipcRenderer.send('connect', 1);
		ipcRenderer.on('connected', (event, arg) => {
			console.log(event, arg);
		});
		ipcRenderer.on('uploading', (event, arg) => {
			if(arg) {
				this.setState({ uploading: arg });
				ipcRenderer.send('uploading', 1);
			}
		});
	}

	render() {

		const { history, classes } = this.props;

		return (
			<div className={ classes.root }>
				<AppBar position="fixed" className={ classes.appbar }>
					<div>
						<Grid
						  container
						  direction="row"
						  justify="space-between"
						  alignItems="flex-start"
						  className={ classes.primarybar }
						>
							<Typography variant="subtitle2" className={ classes.apptitle }>
								iData- Backup Sync
							</Typography>
							<div>
								<IconButton
									style={{ ...nodrag }}
									onClick={ e => {
										remote.getCurrentWindow().minimize();
									}}
								>
									<RemoveIcon />
								</IconButton>
								<IconButton
									style={{ ...nodrag }}
									onClick={ e => { window.close() }}
								>
									<CloseIcon />
								</IconButton>
							</div>
						</Grid>
					</div>
				</AppBar>
				<div style={{ marginTop: 60 }}>
					<Grid
					  container
					  direction="row"
					  justify="center"
					  alignItems="flex-start"
					>
						{ this.state.uploading }
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(withRouter(Home));