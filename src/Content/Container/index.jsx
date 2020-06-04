//====================================================
// Import
//====================================================

//======================
// Vendors

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

//======================
// Own

import Table from '../Table/index.jsx';
import Documentation from '../Documentation/index.jsx';

//====================================================
// Define
//====================================================

const useStyles = makeStyles({
	container: {
		backgroundColor: "#202020",
		color: "white"
	},
	element: {
		paddingTop: "100px",
		paddingBottom: "50px",
	}
});

//====================================================
// Component
//====================================================

function TableContainer(props) {
	const classes = useStyles();

	return (
		<React.Fragment> 
			<CssBaseline/>
			<Container maxWidth="lg" className={classes.container} key={props.pageId}>
				<div className={classes.element}>
					{props.pageId<3?
						<Table pageId={props.pageId} destroyInterval={props.destroyInterval}></Table>:
						<Documentation pageId={props.pageId}></Documentation>
					}
				</div>
			</Container>
		</React.Fragment>
	);
}

//====================================================
// Export
//====================================================

export default TableContainer;

//====================================================
// End
//====================================================