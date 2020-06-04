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
			<Container pageId={2}></Container>
		</div>
	);
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
	if ( !( url.includes("/brains") || url.includes("/mouths") ) )
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
					<Route path="/bots" component={() => <BotsList destroyInterval={destroyInterval}></BotsList>} />
					<Route path="/brains" component={() => <BrainsList destroyInterval={destroyInterval}></BrainsList>} />
					<Route path="/mouths" component={() => <MouthsList destroyInterval={destroyInterval}></MouthsList>} />
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