//====================================================
// Import
//====================================================

//======================
// Vendors

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

//======================
// Own

import fetchWithTimeout from "../../Util/fetchTimeout.js";

//====================================================
// Define
//====================================================

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
	whiteText: {
		color: "white",
	},
	title: {
		backgroundColor: "#000000",
		color: "white"
	},
	row1: {
		backgroundColor: "#A5A5A5",
		"&:hover": {
			backgroundColor: "#707070"
		},
	},
	row2: {
		backgroundColor: "#AAAAAA",
		"&:hover": {
			backgroundColor: "#707070"
		},
	},
	10: {
		width: "10%",
	},
	20: {
		width: "20%",
	},
	30: {
		width: "30%",
	},
	40: {
		width: "40%",
	},
	100: {
		width: "100%",
	},
	error: {
		width: "100%",
		color: "#c21b1b",
	}
});

const URL = [
	["bots", "bot"],
	["brains", "brain"],
	["mouths", "mouth"],
]

//====================================================
// Functions
//====================================================

async function loadData(pageId){
	return await fetchWithTimeout("http://localhost:3001/api/"+URL[pageId][0], {
		method: "GET",
		headers: [
			['Content-Type', 'application/json'],
		]
	});
}

async function changeState(pageId, id, state){
	let payload = "state="+(state?"true":"false");
	return await fetchWithTimeout("http://localhost:3001/api/"+URL[pageId][1]+"/"+id, {
		method: "PATCH",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: payload
	});
}

//====================================================
// Sub Component
//====================================================

function brainsTitleTable(classes){
	return (
		<React.Fragment>
			<TableCell className={classes[20], classes.whiteText}>
				Brain ID
			</TableCell>
			<TableCell className={classes[80], classes.whiteText} align="left">
				Description
			</TableCell>
		</React.Fragment>
	);
}

function botsTitleTable(classes){
	return (
		<React.Fragment>
			<TableCell className={classes[10], classes.whiteText}>
				Bot ID
			</TableCell>
			<TableCell className={classes[26], classes.whiteText} align="left">
				Name
			</TableCell>
			<TableCell className={classes[26], classes.whiteText} align="left">
				Mouths
			</TableCell>
			<TableCell className={classes[26], classes.whiteText} align="left">
				Brains
			</TableCell>
			<TableCell className={classes[10], classes.whiteText} align="center">
				Status
			</TableCell>
		</React.Fragment>
	);
}

//====================================================

function brainsContentTable(classes, row){
	return (
		<React.Fragment>
			<TableCell className={classes[20]} component="th" scope="row">
				{row}
			</TableCell>
			<TableCell className={classes[10]} align="left">
				Description unavailable
			</TableCell>
		</React.Fragment>
	);
}

function botsContentTable(classes, row, handleChange, state){
	return (
		<React.Fragment>
			<TableCell className={classes[10]} component="th" scope="row">
				{row.id}
			</TableCell>
			<TableCell className={classes[26]} align="left">
				{row.name}
			</TableCell>
			<TableCell className={classes[26]} align="left">
				{row.mouths.join(",")}
			</TableCell>
			<TableCell className={classes[26]} align="left">
				{row.brains.join(",")}
			</TableCell>
			<TableCell className={classes[10]} align="center">
				<Switch id={row.id.toString()} checked={row.state} onChange={handleChange} disabled={state.error?true:false}></Switch>
			</TableCell>
		</React.Fragment>
	);
}

//====================================================
// Component
//====================================================

function CustomizedTables(props) {
	const classes = useStyles();

	const [state, setState] = React.useState({
		"refresh" : true,
		"lastInterval": undefined,
		"data": [],
		"error": undefined,
	});

	function get() {
		loadData(props.pageId)
		.then(function(res){
			return res.json(); 
		})
		.then(function(data){
			let list = [];
			for (let id in data){
				let bot = data[id];
				if (props.pageId != 1){
					bot.id = id;
				}
				list.push(bot);
			}
			//console.log(data);
			let st = state;
			st.error = undefined;
			st.data = list;
			setState(st);
		}).catch((error) => {
			let st = state;
			st.error = error;
			setState(st);
		})
	}

	if (state.refresh){
		state.refresh = false;
		
		get();

		if (!state.lastInterval){
			state.lastInterval = setInterval(()=>{
				get();
				setState({ ...state });
			}, 2000);
			props.destroyInterval(state.lastInterval);
			setState({ ...state });
		}
	}

	

	const handleChange = (event) => {
		//let status = state.data[event.target.id].status;
		changeState(props.pageId, event.target.id, event.target.checked).then(() => {
			state.refresh = true;
			setState({ ...state });
		})
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow className={classes.title}>
						{props.pageId===0 && botsTitleTable(classes)}
						{props.pageId===1 && brainsTitleTable(classes)}
					</TableRow>
				</TableHead>
				<TableBody>
					{state.data.map((row, id) => (
						<TableRow key={row.id} className={id%2?classes.row1:classes.row2}>
							{props.pageId===0 && botsContentTable(classes, row, handleChange, state)}
							{props.pageId===1 && brainsContentTable(classes, row)}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Table>
				{ state.error && 
					<TableFooter>
						<TableRow>
							<TableCell className={classes[100]} align="center">
								<Typography variant="h6" className={classes.error}>
									{state.error.toString()}
								</Typography>
							</TableCell>
						</TableRow>
					</TableFooter>
				}
			</Table>
		</TableContainer>
	);
}

//====================================================
// Export
//====================================================

export default CustomizedTables;

//====================================================
// End
//====================================================