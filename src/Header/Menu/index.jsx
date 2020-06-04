//====================================================
// Import
//====================================================

//======================
// Vendors

import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


//======================
// Own

import Drawer from "../Drawer"

//====================================================
// Define
//====================================================

const useStyles = makeStyles((theme) => ({
	bar: {
		backgroundColor: '#373737',
	},
	title: {
		flexGrow: 1,
	},
}));

//====================================================
// Component
//====================================================


function Menu(props){

	const classes = useStyles();

	const [state, setState] = useState({
		open: false
	});

	function handleClick(e)
	{
		//props.changeRouteIndex(e);
		setState({open: !state.open});
	}

	return (
		<AppBar position="static" className={classes.bar}>
			<Toolbar>
				<IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					{props.title}
				</Typography>
				{/* <Button color="inherit">Login</Button> */}
			</Toolbar>
			
			<Drawer open={state.open} clickInside={handleClick}></Drawer>
		</AppBar>
	);
}

//====================================================
// Export
//====================================================

export default Menu;

//====================================================
// End
//====================================================