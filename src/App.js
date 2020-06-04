//====================================================
// Import
//====================================================


//======================
// Vendors

import React from 'react';

import { Router, Route, Redirect } from "react-router-dom";
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

function BotsList(props){

	return (
		<div>
			<Menu title="Bots List"></Menu>
			<Container></Container>
		</div>
	);
}

function BrainsList(props){

	return (
		<div>
			<Menu title="Brains List"></Menu>
		</div>
	);
}

function MouthsList(props){

	return (
		<div>
			<Menu title="Mouths List"></Menu>
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

	return (
		<div className="App">
			<Router history={history}>
				{redirectJSX}
				<Route path="/bots" component={() => <BotsList></BotsList>} />
				<Route path="/brains" component={() => <BrainsList></BrainsList>} />
				<Route path="/mouths" component={() => <MouthsList></MouthsList>} />
			</Router>
		</div>
	);
}

//====================================================
// Export
//====================================================

export default App;

//====================================================
// End
//====================================================