//====================================================
// Import
//====================================================


//======================
// Vendors

import React from 'react';

import { Router, Route, Redirect, Switch, withRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';

//======================
// Own

import './App.css';

import Menu from './Header/Menu/index.jsx';
import Container from './Content/Container/index.jsx';

//====================================================
// Define
//====================================================

//

//====================================================
// Functions
//====================================================

//

//====================================================
// Routes
//====================================================

function BotsList(props){

	return (
		<div>
			<Menu title="Bots List"></Menu>
			<Container pageId={0} destroyInterval={props.destroyInterval}></Container>
		</div>
	);
}

for (let i=0; i<20; i++){
	let message = "Hello";
	fetch("http://localhost:3000/bot/1", {
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: ("message="+message)
	})
	.then(function(res){ return res.json(); })
	.then(function(data){
		console.log("Ally : "+data);
	})
}

function BrainsList(props){

	return (
		<div>
			<Menu title="Brains List"></Menu>
			<Container pageId={1} destroyInterval={props.destroyInterval}></Container>
		</div>
	);
}

function MouthsList(props){

	return (
		<div>
			<Menu title="Mouths List"></Menu>
			<Container pageId={2} destroyInterval={props.destroyInterval}></Container>
		</div>
	);
}

function DocProject() {
	
	return (
		<div>
			<Menu title="Project Documentation"></Menu>
			<Container pageId={3}></Container>
		</div>
	)
}

function DocApi() {
	
	return (
		<div>
			<Menu title="API Documentation"></Menu>
			<Container pageId={4}></Container>
		</div>
	)
}

function DocDiscord() {
	
	return (
		<div>
			<Menu title="Discord Documentation"></Menu>
			<Container pageId={5}></Container>
		</div>
	)
}

//====================================================
// Component
//====================================================

function App() {

	// const [state, setState] = React.useState(
	// 	{
	// 		"open" : false
	// 	}
	// )

	let history = createBrowserHistory();
	const url = history.location.pathname;

	let redirectJSX;
	if ( !( url.includes("/brains") || url.includes("/mouths")
		|| url.includes("/doc-project") || url.includes("/doc-api") || url.includes("/doc-discord") ) )
	{
		redirectJSX = <Redirect to="/bots"/>;
	}

	let lastLastInterval;
	let lastInterval;
	function destroyInterval(id){
		if(lastLastInterval){
			clearInterval(lastLastInterval);
		}
		lastLastInterval = lastInterval
		lastInterval = id;
	}

	return (
		<div className="App">
			<Router history={history}>
				{redirectJSX}
				<Switch>
					<Route path="/doc-discord" component={() => <DocDiscord></DocDiscord>} />
					<Route path="/bots" component={() => <BotsList destroyInterval={destroyInterval}></BotsList>} />
					<Route path="/brains" component={() => <BrainsList destroyInterval={destroyInterval}></BrainsList>} />
					<Route path="/mouths" component={() => <MouthsList destroyInterval={destroyInterval}></MouthsList>} />

					<Route path="/doc-project" component={() => <DocProject></DocProject>} />
					<Route path="/doc-api" component={() => <DocApi></DocApi>} />
				</Switch>
			</Router>
		</div>
	);
}

//====================================================
// Export
//====================================================

export default App;
//export default withRouter(App);

//====================================================
// End
//====================================================