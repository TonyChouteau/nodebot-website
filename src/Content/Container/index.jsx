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

//====================================================
// Define
//====================================================

const useStyles = makeStyles({
	container: {
		backgroundColor: "#202020",
		color: "white"
	},
	element: {
		paddingTop: "50px",
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
			<Container maxWidth="lg" className={classes.container}>
				<div className={classes.element}>
					<Table pageId={props.pageId} destroyInterval={props.destroyInterval}></Table>
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