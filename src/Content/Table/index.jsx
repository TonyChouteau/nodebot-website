//====================================================
// Import
//====================================================

//======================
// Vendors

import React from 'react';
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

import fetchWithTimeout from "./fetchTimeout.js";

//====================================================
// Define
//====================================================

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
	title: {
		backgroundColor: "#707070",
	},
	row: {
		backgroundColor: "#757575",
		"&:hover": {
			backgroundColor: "#757575"
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

//====================================================
// Functions
//====================================================

async function loadData(){
	return await fetchWithTimeout("http://localhost:3001/api/bots", {
		headers: [
			['Content-Type', 'application/json'],]
	}, 2000)
}

async function changeState(id, state){
	let payload = "state="+(state?"true":"false");
	return await fetch("http://localhost:3001/api/bot/"+id, {
		method: "PATCH",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: payload
	});
}

//====================================================
// Component
//====================================================

function CustomizedTables() {
	const classes = useStyles();

	const [state, setState] = React.useState({
		data : [],
		refresh : true,
		error: undefined,
		lastInterval: undefined
	});

	function get() {
		loadData()
		.then(function(res){
			return res.json(); 
		})
		.then(function(data){
			state.error = undefined;
			let list = [];
			for (let id in data){
				let bot = data[id];
				bot.id = id;
				list.push(bot);
			}
			state.data = list;
			setState({ ...state });
		}).catch((error) => {
			state.error = error;
			setState({ ...state });
		})
	}

	if (state.refresh){
		state.refresh = false;
		
		get();

		if (state.lastInterval){
			clearInterval(state.lastInterval);
		}
		let x = Math.random();
		state.lastInterval = setInterval(()=>{
			get();
		}, 2000);
	}

	const handleChange = (event) => {
		//let status = state.data[event.target.id].status;
		changeState(event.target.id, event.target.checked).then(() => {
			state.refresh = true;
			setState({ ...state });
		})
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow className={classes.title}>
						<TableCell className={classes[10]}>
							Bot ID
						</TableCell>
						<TableCell className={classes[26]} align="left">
							Name
						</TableCell>
						<TableCell className={classes[26]} align="left">
							Mouths
						</TableCell>
						<TableCell className={classes[26]} align="left">
							Brains
						</TableCell>
						<TableCell className={classes[10]} align="center">
							Status
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{state.data.map((row) => (
						<TableRow key={row.id}>
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
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Table>
				{ function(){
					if (state.error){
						return (
							<TableFooter>
								<TableRow>
									<TableCell className={classes[100]} align="center">
										<Typography variant="h6" className={classes.error}>
											{state.error.toString()}
										</Typography>
									</TableCell>
								</TableRow>
							</TableFooter>
						)
					} else {
						return <TableFooter></TableFooter>
					}}()
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