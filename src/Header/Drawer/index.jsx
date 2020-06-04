//====================================================
// Import
//====================================================

//======================
// Vendors

import React, {Fragment} from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
// import MapRounded from '@material-ui/icons/MapRounded';
// import SearchRounded from '@material-ui/icons/SearchRounded';

import AndroidIcon from '@material-ui/icons/AndroidRounded';
import BrainIcon from '@material-ui/icons/FilterDramaTwoTone';
import MouthIcon from '@material-ui/icons/CastConnected';
import DescriptionIcon from '@material-ui/icons/Description';
import ExtensionIcon from '@material-ui/icons/Extension';
import CloseIcon from '@material-ui/icons/Close';

import { ReactComponent as DiscordIcon } from '../../Data/Icons/DiscordIcon.svg';

//======================
// Own

//

//====================================================
// Define
//====================================================

const useStyles = makeStyles({
	paper: {
		background: "#424242",
		color: "white"
	},
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	link: {
		textDecoration: 'none',
		"&:hover": {
			textDecoration: 'none',
			color: "white"
		},
		"&:active": {
			textDecoration: 'none',
			color: "white"
		}
	},
	text: {
		textDecoration: 'none',
		color: "white"
	},
	icon: {
		color: "white"
	},
	documentation: {
		color: "white"
	}
});

const items = {
	"main" : [
		["Bots", <AndroidIcon></AndroidIcon>, "/bots"],
		["Brains", <BrainIcon></BrainIcon>, "/brains"],
		["Mouths", <MouthIcon></MouthIcon>, "/mouths"]
	],
	"doc" : [ 
		["Project", <DescriptionIcon></DescriptionIcon>, "/doc-project"],
		["API", <ExtensionIcon></ExtensionIcon>, "/doc-api"],
		["Discord", <DiscordIcon></DiscordIcon>, "/doc-discord"]
	]
} 


//====================================================
// Component
//====================================================

function AppDrawer(props, ref) {

	const classes = useStyles();

	const sideList = () => (
		<div className={classes.list}>
			<ListItem button key={1}>
				<ListItemIcon className={classes.icon}>
					<CloseIcon></CloseIcon>
				</ListItemIcon>
				<ListItemText className={classes.text} primary={"Close"} />
			</ListItem>
			<Divider color="white"/>
			<List 
				subheader={
					<ListSubheader className={classes.text} component="div" id="nested-list-subheader">
						Lists -
					</ListSubheader>
				}
			>
				{items.main.map((elt, i) => (
					<Link className={classes.link} to={elt[2]} key={i}>
						<ListItem button key={elt[0]}>
							<ListItemIcon className={classes.icon}>
								{elt[1]}
							</ListItemIcon>
							<ListItemText className={classes.text} primary={elt[0]} />
						</ListItem>
					</Link>
				))}
			</List>
			<Divider color="white"/>
			<List 
				subheader={
					<ListSubheader className={classes.text} component="div" id="nested-list-subheader">
						Documentation -
					</ListSubheader>
				}
			>
				{items.doc.map((elt, i) => (
					<Link className={classes.link} to={elt[2]} key={i}>
						<ListItem button key={elt[0]}>
							<ListItemIcon className={classes.documentation}>
								{elt[1]}
							</ListItemIcon>
							<ListItemText className={classes.documentation} primary={elt[0]} />
						</ListItem>
					</Link>
				))}
			</List>
		</div>
	  );

	return (
		<Fragment>
			<div onClick={props.clickInside}>
				<Drawer open={props.open} classes={{ paper: classes.paper }}>
					{sideList()}
				</Drawer>
			</div>
		</Fragment>
	);
}

//====================================================
// Export
//====================================================

export default AppDrawer;

//====================================================
// End
//====================================================